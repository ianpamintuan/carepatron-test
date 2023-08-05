import axios, { type AxiosRequestConfig, type Method } from 'axios';

const API_URL = 'http://localhost:5044';

export async function apiGet<T>(uri: string): Promise<T> {
  return await api<T>(uri, 'get', undefined);
}

export async function apiDelete<T>(uri: string): Promise<T> {
  return await api<T>(uri, 'delete');
}

export async function apiPost<T>(
  uri: string,
  data: any,
  onUploadProgress?: (progressEvent: any) => void
): Promise<T> {
  return await api<T>(uri, 'post', data, onUploadProgress);
}

export async function apiPut<T>(uri: string, data: any): Promise<T> {
  return await api<T>(uri, 'put', data);
}

export async function apiPatch<T>(uri: string, data: any): Promise<T> {
  return await api<T>(uri, 'patch', data);
}

async function api<T>(
  uri: string,
  method: Method = 'GET',
  data: any = null,
  onUploadProgress?: (progressEvent: any) => void
): Promise<T> {
  return await call(uri, method, data, onUploadProgress);
}

async function call<T>(
  uri: string,
  method: Method = 'GET',
  data: any = null,
  onUploadProgress?: (progressEvent: any) => void
): Promise<T> {
  let request: AxiosRequestConfig = {
    url: `${API_URL}/${uri}`,
    withCredentials: true,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    method,
    onUploadProgress
  };

  if (data !== null) {
    request = {
      ...request,
      data
    };
  }

  return await axios(request)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw new Error(error.response);
    });
}

const apiClient = {
  get: apiGet,
  post: apiPost,
  put: apiPut,
  patch: apiPatch,
  delete: apiDelete
};

export default apiClient;
