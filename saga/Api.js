import axios from 'axios';
import StartJob from '../redux/reducer/StartJob';
const urlGetJobType = 'http://221.133.17.20:3030/api/view';
const urlStartEndJob = 'http://221.133.17.20:3030/api/viewstart';
const urlCompletedJob = 'http://221.133.17.20:3030/api/viewend';

function* getJobTypeApi() {
    const response = yield axios(urlGetJobType, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        data: '',
      
    });
    // console.log(response);
    const JobType = yield response.status === 200 ? response.data.datafake: []  
    // console.log(JobType);     
    return JobType;
}

function* postStartJob(oder_state) {
    console.log(oder_state);
    const response = yield axios(urlStartEndJob, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        data: '',
      
    });
    console.log(response.data);
    const JobType = yield response.status === 200 ? response.data: []  
    // console.log(JobType);     
    return JobType;
}

function* PostCompletedJob(stateJob) {
    console.log(stateJob);
    const response = yield axios(urlCompletedJob, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        data: '',
      
    });
    console.log(response.data);
    const JobType = yield response.status === 200 ? response.data: []  
    // console.log(JobType);     
    return JobType;
}




export const Api = {
    getJobTypeApi,postStartJob,PostCompletedJob
}; 