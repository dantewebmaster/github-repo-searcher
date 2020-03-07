import ReposTypes from './types';

const initialState = {
  topic: '',
  repos: [],
  page: 1,
  loading: false,
  loadingMore: false,
  error: '',
};

export default function (state = initialState, action) {
  switch (action.type) {
    case ReposTypes.SET_STATE:
      return {
        ...state,
        [action.payload.state]: action.payload.value,
      };
    case ReposTypes.FETCH_REPOS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ReposTypes.FETCH_REPOS_SUCCESS:
      return {
        ...state,
        loading: false,
        repos: action.payload.items,
      };
    case ReposTypes.FETCH_REPOS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case ReposTypes.FETCH_MORE_REPOS_REQUEST:
      return {
        ...state,
        loadingMore: true,
      };
    case ReposTypes.FETCH_MORE_REPOS_SUCCESS:
      return {
        ...state,
        loadingMore: false,
        repos: [...state.repos, ...action.payload.items],
      };
    case ReposTypes.FETCH_MORE_REPOS_FAILURE:
      return {
        ...state,
        loadingMore: false,
        error: action.payload,
      };
    default:
      return state;
  }
}
