

const defaultState = {
    stateOder: 'INACTIVE',
    idOder: '',
};


const stateOder = (state =defaultState, action) => {
    if (action.type === 'CHANGERSTATE') return {stateOder:'ACTIVE',idOder:action.oder_id_state};
    if (action.type === 'CHANGERCOMPLETED') return {stateOder:'COMPLETED',idOder:action.id};
    // if (action.type === 'END') return 'COMPLETED';
  
    return state;
};

export default stateOder;