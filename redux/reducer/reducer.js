
import { combineReducers } from 'redux';
import countReducer from './couterReducer';
import filterStatusReducer from './filterStatusReducer';
import dataJakeReducer from './dataFakeReducer';
import stateOder from './stateOder';
import changer_color from './changer_color';
import JobReducers from './JobReducer';
import StartJobBtn from './StartJob';




const reducer = combineReducers({
    count: countReducer, 
    filterStatus : filterStatusReducer,
    dataFake : dataJakeReducer,
    stateOder : stateOder,
    changer_color: changer_color,
    DataJob: JobReducers,
    StartJob: StartJobBtn,
});

export default reducer;