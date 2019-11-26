
import { createStore,applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './../saga/rootSaga'; 
import reducer from './reducer/reducer';

const sagaMiddleware = createSagaMiddleware();
const store = createStore(reducer,applyMiddleware(sagaMiddleware));
sagaMiddleware.run(rootSaga);
export default store;
//tich hop vao trong ung dung react - Provider -> 1 component - 1 props -> store