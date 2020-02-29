import { put, takeEvery, call, select } from 'redux-saga/effects'
import * as actions from './actions';
import ReposTypes from './types';
import * as selectors from './selectors';

import * as githubApi from '../../services/github.service'

export function* fetchReposRequest() {
  try {
    const page = yield select(selectors.selectPage)
    const response = yield call(githubApi.searchRepos, 'redux', page)
    yield put(actions.fetchReposSuccess(response.data))
  } catch (error) {
    yield put(actions.fetchReposFailure(error.response))
  }
}

export function* fetchMoreReposRequest() {
  try {
    const page = yield select(selectors.selectPage)
    const response = yield call(githubApi.searchRepos, 'redux', page)
    yield put(actions.fetchMoreReposSuccess(response.data))
  } catch (error) {
    console.log(error)
    yield put(actions.fetchMoreReposFailure(error.response))
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
]
