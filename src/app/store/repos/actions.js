import ReposTypes from './types';

export const fetchRepos = () => {
  return {
    type: ReposTypes.FETCH_REPOS_REQUEST,
  }
}

export const fetchReposSuccess = (payload) => {
  return {
    type: ReposTypes.FETCH_REPOS_SUCCESS,
    payload,
  }
}

export const fetchReposFailure = (payload) => {
  return {
    type: ReposTypes.FETCH_REPOS_FAILURE,
    payload,
  }
}

export const fetchMoreRepos = () => {
  return {
    type: ReposTypes.FETCH_MORE_REPOS_REQUEST,
  }
}

export const fetchMoreReposSuccess = (payload) => {
  return {
    type: ReposTypes.FETCH_MORE_REPOS_SUCCESS,
    payload,
  }
}

export const fetchMoreReposFailure = (payload) => {
  return {
    type: ReposTypes.FETCH_MORE_REPOS_FAILURE,
    payload,
  }
}
