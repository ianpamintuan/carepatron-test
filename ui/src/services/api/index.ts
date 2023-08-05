import apiClient from './apiClient';

export const getClients = async (): Promise<IClient[]> => {
  return await apiClient.get<IClient[]>('clients');
};

export const createClient = async (client: IClient): Promise<void> => {
  await apiClient.post<void>('clients', client);
};

export const updateClient = async (client: IClient): Promise<void> => {
  await apiClient.put<void>('clients', client);
};
