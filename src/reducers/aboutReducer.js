import { CHANGE_CAT_COLOR } from '../constants/index';

const aboutReducer = (state = {color: "Black"}, action) =>{
  switch (action.type) {
    case CHANGE_CAT_COLOR:
      let newState = {}
      newState['color'] = action.value;
      return newState;
    default:
      return state;
  }
};

export default aboutReducer;