

 const countReducer = (state=true, action) => {
    // if (typeof state === 'undefined') {
    //   return 0;
    // }
  
    switch (action.type) {
      case 'INCREMENT':
        return !state;
      case 'DECREMENT':
        return 'END';
      default:
        return state;
    }
  }
  export default countReducer;