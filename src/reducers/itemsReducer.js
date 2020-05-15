import { GET_ITEMS } from '../constants/index';

const itemsReducer = (state = {items: [] }, action) =>{
  switch (action.type) {
    case GET_ITEMS:
      let newState = {};
      newState['items'] = action.value;
    return newState;
    default:
      return state;
  }
};

export default itemsReducer;