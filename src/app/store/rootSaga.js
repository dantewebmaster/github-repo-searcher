import { fork, all } from 'redux-saga/effects';
import { sagas as reposSagas } from './repos';
import { sagas as authorSagas } from './author';

const allSagas = [
  ...reposSagas,
  ...authorSagas,
];

export default function* rootSaga() {
  yield all(allSagas.map((saga) => fork(saga)));
}
