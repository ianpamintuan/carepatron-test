import React, { createContext, useReducer } from 'react';
import Clients from '../pages/Clients';

const initialState: IApplicationState = {
  clients: []
};

export const StateContext = createContext<{
  state: IApplicationState;
  dispatch: React.Dispatch<Action>;
}>(
  // @ts-expect-error
  null
);

export const ACTIONS = {
  FETCH_ALL_CLIENTS: 'FETCH_ALL_CLIENTS',
  CREATE_CLIENT: 'CREATE_CLIENT'
};

interface Action {
  type: keyof typeof ACTIONS;
  data?: any;
}

const reducer = (state: IApplicationState, action: Action) => {
  switch (action.type) {
    case ACTIONS.FETCH_ALL_CLIENTS:
      return { ...state, clients: state.clients };
    case ACTIONS.CREATE_CLIENT:
      return { ...state, clients: [...state.clients, action.data] };
    default:
      return state;
  }
};

export default function DataProvider({ children }: { children?: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <StateContext.Provider
      value={{
        state,
        dispatch
      }}
    >
      {children}
    </StateContext.Provider>
  );
}
