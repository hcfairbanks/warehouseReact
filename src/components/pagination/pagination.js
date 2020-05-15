import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import '../../css/pagination.scss';
import { baseUrl } from '../../config/config';

class Pagination extends React.Component {
  constructor(props) {
    super(props);
    this.state = { searchTerm: '',
      startDate: new Date()
    };
  }
  
  handleChange = date => {
    this.setState({
      startDate: date
    });
  };

  // TODO Change from fetch to axios
  mySubmitHandler = (event) => {
    event.preventDefault();
    const componentThis = this;  
    fetch(`/items/search.json?name=${this.state.searchTerm}`).then((response) => {
        response.json().then((data) => {
            componentThis.props.getItems(data["items"])
            componentThis.props.getPagination(data["pagination"])
            componentThis.props.setSearchProperties(data["search_properties"])
        });
    });
  }

  myChangeHandler = (event) => {
    this.setState({searchTerm: event.target.value});
  }

   paginate = async (event) => {
    const page_number = parseInt(event.target.dataset.page);
    const request_params = this.props.searchItemsReducer.search_details
    let res = await axios.get(`${baseUrl}/items?page=${page_number}&${request_params}`,
                              { withCredentials: true } );
    this.props.updatePagination(res.data.pagination_details);
    this.props.updateItems(res.data.items);

    this.setState({
      items: res.data.items,
      pagination_details: res.data.pagination
    });
  }

  display_pagination = () =>{
    let span = [];
    let alpha = 1;
    let delta = 2;
    let left = 0;
    let right = 0;
    let left_dots = 0;
    let right_dots = 0;

    let range = (delta * 2) + delta;
    // TODO rename variables
    let number_of_pages = this.props.paginationReducer.pagination_details.page_count;
     // TODO rename variables
    let current_page = this.props.paginationReducer.pagination_details.current_page;

    if (number_of_pages >= range){
      //  Set Range
      if (current_page >= 1){
        left = current_page - delta;
        right = current_page + delta;
        if (right >= number_of_pages){
          right = number_of_pages;
          left = number_of_pages - (delta * 2);
        }
        if (left <= 0){
          left = alpha;
          right = (delta * 2) + alpha;
        }
      }else{
        left = alpha;
        current_page = alpha;
        right = (delta * 2) + alpha;
        left_dots = 0;
        right_dots = range;
      }

      //  Left Dots
      if (current_page === alpha){
        left_dots = 0;
      }else if (current_page - range <= alpha){
        left_dots = alpha;
      }else if (right === number_of_pages){
        left_dots = (number_of_pages - range) -1;
      }else{
        left_dots = (current_page - (range - delta )) -1;
      }
    
      // Right Dots
      if ((current_page + range ) >= number_of_pages){
        right_dots = number_of_pages
      }else if (left === alpha){
        right_dots =  range + left + 1;
      }else{
        right_dots = (current_page + (range - delta) ) + 1
      }

    }else{
      left = alpha;
      right = number_of_pages;
      left_dots = alpha;
      right_dots = number_of_pages;
    }// END

    let show_left_dots = (left_dots < ( current_page - delta ) && left_dots >= alpha)
    let show_right_dots = (current_page !== number_of_pages && !(right >= number_of_pages))

    // Previous
     if ( current_page > 1 ){
        span.push(
                  <span
                    key={'first_page'}
                    className='page_button'
                    data-page={1}
                    onClick={this.paginate}>
                      First Page
                  </span>);
     }else{
        span.push(
                  <span
                    key={'first_page'}
                    className='page_button_disabled'
                    data-page={1} >
                      First Page
                  </span>);
     }
    if (show_left_dots){
      span.push(
                <span
                  key={left_dots}
                  className='pagination_dots'
                  data-page={left_dots}
                  onClick={this.paginate}>
                    {`...`}
                </span>);
    }
     while (left < (right + 1 )) {
      if (left === current_page){ 
        span.push(
                  <span
                    key={left}
                    className='page_button_disabled'
                    data-page={left}
                    onClick={this.paginate}>
                      {left}
                  </span>);
      }else{
        span.push(
                  <span
                    key={left}
                    className='page_button'
                    data-page={left}
                    onClick={this.paginate}>
                      {left}
                  </span>);
      }
      left++;
    }
    if (show_right_dots){
      span.push(
                <span
                  key={right_dots}
                  className='pagination_dots'
                  data-page={right_dots}
                  onClick={this.paginate}>
                    {`...`}
                </span>);
    }
    // Next 
    if (current_page === number_of_pages){
      span.push(
                 // TODO disable or no last page
                <span
                  key={'last_page'}
                  className='page_button_disabled'
                  data-page={number_of_pages}>
                    Last Page
                </span>)
    }else {
      span.push(
                <span
                  key={'last_page'}
                  className='page_button'
                  data-page={number_of_pages}
                  onClick={this.paginate}>
                    Last Page
                  </span>)
     }
    return span
  }

  render() {
    return (
      <div style={{marginBottom: "100px"}}>
        { this.display_pagination() }
      </div>
    );
  }
}

const mapStateToProps = ( state ) => {
  return {
    itemsReducer: {
      items: state.itemsReducer.items
    },
    paginationReducer: {
      pagination_details: state.paginationReducer.pagination_details,
    },
    searchItemsReducer: {
      search_details: state.searchItemsReducer.search_details,
    }
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateItems: (newItems) => dispatch({type:'GET_ITEMS', value: newItems}),
    updatePagination: (new_details) => dispatch(
                                        {
                                          type:'ITEMS_PAGINATION',
                                          value:
                                            {
                                              pagination_details:
                                                {
                                                  current_page: new_details.current_page,
                                                  page_count: new_details.page_count
                                                }
                                              }
                                          }
                                        ),
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Pagination);