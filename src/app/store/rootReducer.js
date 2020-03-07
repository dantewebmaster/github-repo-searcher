import { combineReducers } from 'redux';

import repos from './repos';
import author from './author';

export default combineReducers({
  repos,
  author,
});
