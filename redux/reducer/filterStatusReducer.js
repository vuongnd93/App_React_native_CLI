
const filterStatusReducer = (state = 'SHOW_ALL', action) => {
    if (action.type === 'FILTER_SHOW_ALL') return 'SHOW_ALL';
    if (action.type === 'FILTER_PROCESSING') return 'PROCESSING';
    if (action.type === 'FILTER_COMPLETED') return 'COMPLETED';
    return state;
};

export default filterStatusReducer;