import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { Row, Col } from 'react-bootstrap';
import { createSearch } from '../../lib/createSearch';
import DatePicker from 'react-datepicker';
import CategoriesDropDown from '../categoriesDropDown/categoriesDropDown';
import UsersDropDown from '/home/deploy/git/warehouse/src/components/usersDropDown.js/usersDropDown.js';
import { baseUrl } from '../../config/config';
import '../../css/items.scss';
import "react-datepicker/dist/react-datepicker.css";

class SearchItems extends Component {
  constructor(props){
    super(props);
    
    this.state = {
                    startDate: "",
                    endDate: "",
                    itemsReducer:{
                    items: []
                  },
                    error_message: ''
                  };
  }

  changeGreaterThanDate = date => {
    this.setState({
      startDate: date
    });
  };

  changeLessThanDate = date => {
    this.setState({
      endDate: date
    });
  };

  async searchItems(){
    const item_names = [
      'name',
      'categoryId',
      'description',
      'lessThanPrice',
      'greaterThanPrice',
      'purchaseDetails',
      'purchaseLocation',
      'userId',
      'lessThanWeight',
      'greaterThanWeight',
      'lessThanPurchaseDate',
      'greaterThanPurchaseDate'
    ]

    // TODO maybe rename to createParams???
    const request_params = createSearch(item_names,'search_item_');
    let res = await axios.get(`${baseUrl}/items?page=1&${request_params}`,
                              { withCredentials: true } );
    await this.props.updatePagination(res.data.pagination_details);
    await this.props.updateItems(res.data.items);
    await this.props.updateSearch(request_params)
  }

  render(){
    return (
    <div className="SearchItems">
        <Row className={"show-grid"}>
          <Col md={12}>
            <table style={{width:"100%"}}>
            <tbody>
            <tr>
              <td>
                <input
                  type='text'
                  placeholder={'Name'}
                  id={'search_item_name'}
                  className={'form-control'}
                />
              </td>
              <td>
                <CategoriesDropDown
                  id={'search_item_categoryId'}
                  className={"form-control"}
                />
              </td>
              <td>
                <input
                  type='text'
                  placeholder={'Description'}
                  id={'search_item_description'}
                  className={'form-control'}
                />
              </td>
              <td>
                <UsersDropDown
                  id={'search_item_userId'}
                  className={"form-control"}
                />
              </td>
            </tr>
            <tr>
              <td>
                <input
                  type='text'
                  placeholder={'Greater Than Price'}
                  id={'search_item_greaterThanPrice'}
                  className={'form-control'}
                />
              </td>
              <td>
                <input
                  type='text'
                  placeholder={'Less Than Price'}
                  id={'search_item_lessThanPrice'}
                  className={'form-control'}
                />
              </td>
              <td>
                <input
                  type='text'
                  placeholder={'Purchase Details'}
                  id={'search_item_purchaseDetails'}
                  className={'form-control'}
                />
              </td>
              <td>
                <input
                  type='text'
                  placeholder={'Location'}
                  id={'search_item_purchaseLocation'}
                  className={'form-control'}
                />
              </td>
            </tr>
            <tr>
              <td>
                <input
                  type='text'
                  placeholder={'Greater Than Weight'}
                  id={'search_item_greaterThanWeight'}
                  className={'form-control'}
                />
              </td>
              <td>
                <input
                  type='text'
                  placeholder={'Less Than Weight'}
                  id={'search_item_lessThanWeight'}
                  className={'form-control'}
                />
              </td>
              <td>
                <DatePicker
                  placeholderText={"Start Date"}
                  id={'search_item_greaterThanPurchaseDate'}
                  selected={this.state.startDate}
                  onChange={this.changeGreaterThanDate}
                  dateFormat="yyyy-MM-dd"
                  className={'form-control'}
                />
              </td>
              <td>
                <DatePicker
                  placeholderText={"End Date"}
                  id={'search_item_lessThanPurchaseDate'}
                  selected={this.state.endDate}
                  onChange={this.changeLessThanDate}
                  dateFormat="yyyy-MM-dd"
                  className={'form-control'}
                />
              </td>
            </tr>
            <tr>
              <td></td>
              <td></td>
              <td></td>
              <td>
                <button
                  className={"btn btn-outline-primary"}
                  style={{width: '100%'}}
                  onClick={ this.searchItems.bind(this) }>
                    Search
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </Col>
    </Row>
    <br/>
  </div>
  )}
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
                                        }),
    updateSearch: (new_details) => dispatch(
                                    {
                                      type:'SEARCH_ITEMS',
                                      value:
                                        {
                                          search_details: new_details
                                        }
                                    }),
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(SearchItems);