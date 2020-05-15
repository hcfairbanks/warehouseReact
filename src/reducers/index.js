import { combineReducers } from 'redux';

import aboutReducer      from './aboutReducer';
import itemsReducer      from './itemsReducer';
import paginationReducer from './paginationReducer'
import searchItemsReducer from './searchItemsReducer';

export default combineReducers ({
  "aboutReducer": aboutReducer,
  "itemsReducer": itemsReducer,
  "paginationReducer": paginationReducer,
  "searchItemsReducer": searchItemsReducer
});

