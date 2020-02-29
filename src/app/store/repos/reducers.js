import ReposTypes from './types';

const initialState = {
  repos: [],
  page: 1,
  loading: false,
  loadingMore: false,
  error: '',
};

export default function (state = initialState, action) {
  switch (action.type) {
    case ReposTypes.FETCH_REPOS_REQUEST:
      return {
        ...state,
        loading: true,
      }
    case ReposTypes.FETCH_REPOS_SUCCESS:
      return {
        ...state,
        loading: false,
        page: state.page += 1,
        repos: action.payload.items
      }
    case ReposTypes.FETCH_REPOS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload
      }

    case ReposTypes.FETCH_MORE_REPOS_REQUEST:
      return {
        ...state,
        loadingMore: true,
      }
    case ReposTypes.FETCH_MORE_REPOS_SUCCESS:
      return {
        ...state,
        loadingMore: false,
        page: state.page += 1,
        repos: [...state.repos, ...action.payload.items]
      }
    case ReposTypes.FETCH_MORE_REPOS_FAILURE:
      return {
        ...state,
        loadingMore: false,
        error: action.payload
      }
    default:
      return state
  }
}
