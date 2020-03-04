import {
  put, takeEvery, call, select,
} from 'redux-saga/effects';
import * as actions from './actions';
// import * as selectors from './selectors';
import selectAuthorName from './selectors';
import AuthorTypes from './types';

import { fetchAuthor } from '../../services/github.service';

export function* fetchAuthorRequest() {
  try {
    const authorName = yield select(selectAuthorName);
    const response = yield call(fetchAuthor, authorName);
    yield put(actions.fetchAuthorSuccess(response.data));
  } catch (error) {
    yield put(actions.fetchAuthorFailure(error.response));
  }
}

export function* watchFetchAuthor() {
  yield takeEvery(AuthorTypes.FETCH_AUTHOR_REQUEST, fetchAuthorRequest);
}

export const sagas = [
  watchFetchAuthor,
];
