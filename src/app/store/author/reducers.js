import AuthorTypes from './types';

const initialState = {
  authorName: null,
  data: null,
  loading: false,
  error: '',
};

export default function (state = initialState, action) {
  switch (action.type) {
    case AuthorTypes.SET_STATE:
      return {
        ...state,
        [action.payload.state]: action.payload.value,
      };
    case AuthorTypes.FETCH_AUTHOR_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case AuthorTypes.FETCH_AUTHOR_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
      };
    case AuthorTypes.FETCH_AUTHOR_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
}
