import { sagas as reposSagas } from './repos';
import { fork, all } from 'redux-saga/effects';

const allSagas = [
  ...reposSagas
];

export default function* rootSaga() {
  yield all(allSagas.map((saga) => fork(saga)));
}
