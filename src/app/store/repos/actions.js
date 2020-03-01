import ReposTypes from './types';

export const setState = (payload) => ({
  type: ReposTypes.SET_STATE,
  payload,
});

export const fetchRepos = () => ({
  type: ReposTypes.FETCH_REPOS_REQUEST,
});

export const fetchReposSuccess = (payload) => ({
  type: ReposTypes.FETCH_REPOS_SUCCESS,
  payload,
});

export const fetchReposFailure = (payload) => ({
  type: ReposTypes.FETCH_REPOS_FAILURE,
  payload,
});

export const fetchMoreRepos = () => ({
  type: ReposTypes.FETCH_MORE_REPOS_REQUEST,
});

export const fetchMoreReposSuccess = (payload) => ({
  type: ReposTypes.FETCH_MORE_REPOS_SUCCESS,
  payload,
});

export const fetchMoreReposFailure = (payload) => ({
  type: ReposTypes.FETCH_MORE_REPOS_FAILURE,
  payload,
});
