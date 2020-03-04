import AuthorTypes from './types';

export const setState = (payload) => ({
  type: AuthorTypes.SET_STATE,
  payload,
});

export const fetchAuthor = () => ({
  type: AuthorTypes.FETCH_AUTHOR_REQUEST,
});

export const fetchAuthorSuccess = (payload) => ({
  type: AuthorTypes.FETCH_AUTHOR_SUCCESS,
  payload,
});

export const fetchAuthorFailure = (payload) => ({
  type: AuthorTypes.FETCH_AUTHOR_FAILURE,
  payload,
});
