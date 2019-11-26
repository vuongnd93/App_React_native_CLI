
// import { FETCH_JOB, FETCH_SUCCEEDED, FETCH_FAILED } from '../redux/actionCreators';
//Saga effects
import AsyncStorage from 'react-native';
import { put, takeLatest } from 'redux-saga/effects';
import { Api } from './Api';

function* FetchJob() {
    console.log(`This is FETCH_JOB`);
    try {
        const receivedJob = yield Api.getJobTypeApi();         
        yield put({ type: 'FETCH_SUCCEEDED',receivedJob: receivedJob});         
    } catch (error) {        
        yield put({ type:'FETCH_FAILED', error });
    }
}
export function* watchFetchJob() {
    yield takeLatest('FETCH_JOB', FetchJob);
}

function* statJob(action) {
    console.log(`#Jobsagas.js This is START_JOB`);
    console.log(action.Oder_detail_id);
    try {
        const result = yield Api.postStartJob(action.oder_state); 
        if (result =='OK'){         
            yield put({ type: 'STARTJOB', oder_action: action.Oder_detail_id});  
            yield put({ type: 'CHANGERSTATE', oder_id_state:action.Oder_detail_id});
            // AsyncStorage.setItem(action.Oder_detail_id,'PROCESSING');
            
        }        
               
    } catch (error) {        
        yield put({ type: 'ERROR'});
    }
}
export function* watchStartJob() {
    yield takeLatest('START', statJob);
}

function* CompletedJob(action) {
    console.log(`This is COMPLETED_JOB`);
    console.log(action.oder_detail_id);
    try {
        const result = yield Api.postStartJob(action.stateJob); 
        if (result =='OK'){
            yield put({ type: 'COMPLETEDJOB', oder_action:action.oder_detail_id});  
            yield put({ type: 'CHANGERCOMPLETED', oder_detail_id:action.oder_detail_id});
        }        
               
    } catch (error) {        
        yield put({ type: 'ERROR'});
    }
}
export function* watchCompletedJob() {
    yield takeLatest('COMPLETED', CompletedJob);
}


