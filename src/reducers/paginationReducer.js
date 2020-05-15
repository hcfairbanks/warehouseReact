import { ITEMS_PAGINATION } from '../constants/index';

const initialState = {
  pagination_details: {
    current_page: 4,
    page_count: 20
  }
}


const paginationReducer = (state = initialState, action) => {
  switch (action.type) {
    case ITEMS_PAGINATION:
      return action.value;
    default:
      return state;
  }
};

export default paginationReducer;