import axios from 'axios';
import StartJob from '../redux/reducer/StartJob';
const urlGetJob = 'https://hcerp.vn/ords/retail/Delivery/Get_Deliveries';
// const urlGetJob = 'https://jsonplaceholder.typicode.com/todos/1';
const urlGetJobType = 'http://221.133.17.20:3030/api/view';

//   function* getJobTypeApi(){
//     try {
//       let response = yield axios(
//         'http://221.133.17.20:3030/api/view',
//       );
//       console.log(response.datafake);
//       const JobType = yield response.status === 200 ? response.datafake: []  
//       // console.log(JobType);     
//       return JobType;
//     } catch (error) {
//       console.error(error);
//     }
//   }

function* getJobTypeApi() {
    const response = yield axios(urlGetJob, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        data: '',
      
    });
    
    // console.log(response.data.data); 
    const JobType = yield response.status === 200 ? response.data.data: []  
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