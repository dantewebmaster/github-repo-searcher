import React, { createContext, useReducer } from 'react';
import AppReducer from './AppReducer';

// Initial state
const initialState = {
  repos: [],
  loading: false,
  error: '',
}

// Create context
export const GlobalContext = createContext(initialState);

// Provider component
export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  // Actions
  function fetchReposRequest(payload) {
    dispatch({
      type: 'FETCH_REPOS_REQUEST',
      payload // page + topic
    });
  }

  function fetchReposSuccess(payload) {
    dispatch({
      type: 'FETCH_REPOS_SUCCESS',
      payload // repos/repos new page
    });
  }

  function fetchReposFailure(payload) {
    dispatch({
      type: 'FETCH_REPOS_FAILURE',
      payload // error data
    });
  }

  return (
    <GlobalContext.Provider
      value={{
        state: { ...state },
        actions: {
          fetchReposRequest,
          fetchReposSuccess,
          fetchReposFailure,
        }
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}
