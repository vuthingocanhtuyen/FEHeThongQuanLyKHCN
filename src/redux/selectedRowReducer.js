const initialState = null;

const selectedRowReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_SELECTED_ROW_ID':
      return action.payload;
    default:
      return state;
  }
};

export default selectedRowReducer;