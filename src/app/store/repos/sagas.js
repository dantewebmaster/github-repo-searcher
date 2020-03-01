import {
  put, takeEvery, call, select,
} from 'redux-saga/effects';
import * as actions from './actions';
import * as selectors from './selectors';
import ReposTypes from './types';

import searchRepos from '../../services/github.service';

export function* fetchReposRequest() {
  try {
    let page = yield select(selectors.selectPage);
    const topic = yield select(selectors.selectTopic);

    const response = yield call(searchRepos, topic, page);
    yield put(actions.fetchReposSuccess(response.data));
    yield put(actions.setState({ state: 'page', value: page += 1 }));
  } catch (error) {
    yield put(actions.fetchReposFailure(error.response));
  }
}

export function* fetchMoreReposRequest() {
  try {
    let page = yield select(selectors.selectPage);
    const topic = yield select(selectors.selectTopic);

    const response = yield call(searchRepos, topic, page);
    yield put(actions.fetchMoreReposSuccess(response.data));
    yield put(actions.setState({ state: 'page', value: page += 1 }));
  } catch (error) {
    yield put(actions.fetchMoreReposFailure(error.response));
  }
}

export function* watchFetchRepos() {
  yield takeEvery(ReposTypes.FETCH_REPOS_REQUEST, fetchReposRequest);
}

export function* watchFetchMoreRepos() {
  yield takeEvery(ReposTypes.FETCH_MORE_REPOS_REQUEST, fetchMoreReposRequest);
}

export const sagas = [
  watchFetchRepos,
  watchFetchMoreRepos,
];
