import { fork, all } from 'redux-saga/effects';
import { sagas as reposSagas } from './repos';

const allSagas = [
  ...reposSagas,
];

export default function* rootSaga() {
  yield all(allSagas.map((saga) => fork(saga)));
}
