import axios from 'axios';
import { Token } from './gettoken';
import { authorize } from 'react-native-app-auth';
import StartJob from '../redux/reducer/StartJob';
const urlGetJob = 'https://hcerp.vn/ords/retail/Delivery/Get_Deliveries';
// const urlGetJob = 'https://jsonplaceholder.typicode.com/todos/1';
const urlstartlvc = 'https://hcerp.vn/ords/retail/Delivery/Start_Delivery?';
const urlGetJobType = 'http://221.133.17.20:3030/api/view';



function* getJobTypeApi() {
    const DEMO_TOKEN = yield Token.getNewToken(); 
    // console.log(DEMO_TOKEN);
    const response = yield axios(urlGetJob, {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + DEMO_TOKEN
        },
        data: '',
      
    });
    
    // console.log(response.data.data); 
    const JobType = yield response.status === 200 ? response.data.data: []  
    // console.log(JobType);     
    return JobType;
}
// function* getJobTypeApi() {

//     const response = yield axios('https://hcerp.vn/ords/retail/oauth/token?grant_type=client_credentials', {
//         method: 'POST',
//         // params=params,    
//         headers: {
//             'Content-Type': 'application/json',
//             Authorization: `Basic dElYNG52TEJ3UndhN0xnTkZMT01vUS4uOkl5NFpOcFcwZzNudGdyNFRGczZKTFEuLg==`,
//           },
//           data: {
//             grant_type: 'client_credentials',
//             scope: 'test',
//           },
      
//     });
    
//     console.log(response.data.access_token); 
//     console.log('heelo'); 
//     const JobType = yield response.status === 200 ? response.data.data: []  
//     // console.log(JobType);     
//     return JobType;
// }


function* STARTLVC(P_DEL_ID,P_START_BY) {
    // console.log(oder_state);
    const response = yield axios(urlstartlvc,{
        method: 'POST',
        params:{P_DEL_ID:P_DEL_ID,P_START_BY:P_START_BY},
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
    getJobTypeApi,postStartJob,PostCompletedJob,STARTLVC
}; 