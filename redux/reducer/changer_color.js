
const changer_color = (state = 'yellow', action) => {
    if (action.type === 'CHANGER_COLOR') return 'white'; 
    return state;
};

export default changer_color;