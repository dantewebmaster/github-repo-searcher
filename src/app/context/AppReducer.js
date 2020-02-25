export default (state, action) => {
  const { type, payload } = action;
  switch(type) {
    case 'FETCH_REPOS_REQUEST':
      return {
        ...state,
        loading: true
      }
    case 'FETCH_REPOS_SUCCESS':
      return {
        ...state,
        repos: payload,
        loading: false
      }
    case 'FETCH_REPOS_FAILURE':
      return {
        ...state,
        error: payload,
        loading: false
      }
    default:
      return state;
  }
}
