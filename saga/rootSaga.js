
// import { delay } from 'redux-saga';
// import { all } from 'redux-saga/effects';

// import { sayHello } from './counterSagas';
// import {  watchIncrement,watchDecrement } from './counterSagas';

// export default function* rootSaga() {
//     yield all([
//         // sayHello(),
//         watchIncrement(), 
//         watchDecrement(), 
//     ]);
// }

import {all,fork} from 'redux-saga/effects';
import {watchFetchJob} from './Jobsagas';
import {watchStartJob} from './Jobsagas';
import {watchCompletedJob} from './Jobsagas';

export default function* rootSaga() {
    yield  fork(watchFetchJob),
    yield  fork(watchStartJob); 
    yield  fork(watchCompletedJob);     
}