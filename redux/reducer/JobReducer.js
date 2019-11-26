

// import {FETCH_JOB, FETCH_SUCCEEDED, FETCH_FAILED } from '../actionCreators';
import AsyncStorage from 'react-native';
const defaultState = {
    Job: [],
    isLoading: false,
    error: false
};
_onStartJob = async (oder_action)=>{
    try {
      await AsyncStorage.setItem(oder_action,'PROCESSING');
    } catch (error) {
       console.log(error);
    }
  }
const JobReducers = (state = defaultState, action) => {
    switch (action.type) {
        case 'FETCH_SUCCEEDED':
            return {Job:action.receivedJob, error:false,isLoading:false};
        case 'FETCH_FAILED':
            return {Job:[], error:true,isLoading:false};
        case 'STARTJOB':
            // console.log('#JobReducer', action.oder_action)
            state.Job.map (e => {
                // console.log('#jobReducer loop e = ', e.Oder_id);
                e.oder_detail.map (e1 => {
                    // console.log('#jobReducer loop e = ', e1.Oder_detail_id);
                    if (e1.Oder_detail_id === action.oder_action){
                        e1.status = "PROCESSING";
                        // _onStartJob(action.oder_action)
                        // AsyncStorage.setItem(action.oder_action,'PROCESSING');                   
                    }                                 
                })              
            })
      
        return state;
        case 'COMPLETEDJOB':
            // console.log('#JobReducer', action.oder_action)
            state.Job.map (e => {
                // console.log('#jobReducer loop e = ', e.Oder_id);
                e.oder_detail.map (e1 => {
                    // console.log('#jobReducer loop e = ', e1.Oder_detail_id);
                    if (e1.Oder_detail_id === action.oder_action){
                        e1.status = "COMPLETED"                   
                    }                                 
                })              
            })
      
        return state;
            
            
            // console.log('#JobReducer', state)
          
            // return action.order_detail_item;
            // return {...action.order_detail_item, status: 'PROCESSING'}
        default:
            return state; //state does not change
    }
}

export default JobReducers;