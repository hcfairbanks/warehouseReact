import { SEARCH_ITEMS } from '../constants/index';

// const initialState = {
//   search_details: {
//     Name: "",
//     Category: "",
//     Description: "",
//     Price: "",
//     Purchase: "",
//     Date: "",
//     Purchase: "",
//     Details: "",
//     Purchase: "",
//     Location: "",
//     Weight: ""
//   }
// }

const initialState = {
  search_details: ""
}

const searchItemsReducer = (state = initialState, action) =>{
  switch (action.type) {
    case SEARCH_ITEMS:
      let newState = {};
      newState = action.value;
    return newState;
    default:
      return state;
  }
};

export default searchItemsReducer;