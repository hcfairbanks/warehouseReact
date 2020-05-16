import React, { Component } from 'react';
import Navlist from '../navlist/navlist'
import SearchItems from '../searchItems/searchItems'
import axios from 'axios';
import { connect } from 'react-redux';
import { Container, Row, Col } from 'react-bootstrap';
import Moment from 'react-moment';
import '../../css/items.scss';
import Pagination from '../pagination/pagination';
import { baseUrl } from '../../config/config';

class Items extends Component {
  componentDidMount(){
    this.getItems();
  }

  async getItems(){
    let res = await axios.get(`${baseUrl}/items?page=1`,{ withCredentials: true } );
    await this.props.updatePagination(res.data.pagination_details);
    await this.props.updateItems(res.data.items);
  }

  async deleteItem(itemId) {
    const page = this.props.paginationReducer.pagination_details.current_page
    const request_params = this.props.searchItemsReducer.search_details
    try{
      if (window.confirm('Are you sure you want to delete this?')){
        await axios.delete(`${baseUrl}/items/${itemId}`,{ withCredentials: true } );
        let refreshResponse = await axios.get(`${baseUrl}/items?page=${page}&${request_params}`,
                                              { withCredentials: true } );
        await this.props.updatePagination(refreshResponse.data.pagination_details);
        await this.props.updateItems(refreshResponse.data.items);
      }
    } catch (error){
      if (error.response.status === 404){
        alert('Item not found');
      }
      else{
        alert('Unknown error');
      }
    }
  }

  rowClass = (index) =>{
    let rowStyle = {}
    if (index % 2 === 0){
      rowStyle = "odd_row"
    } else {
      rowStyle = "even_row"
    }
    return rowStyle
  }

  render(){
    return (
    <div className="Items">
      <Navlist history={this.props.history}/>
      <h1>Items</h1>
      <br/>
      <Container>
        <Row className={"show-grid"}>
          <Col md={12}>
            <SearchItems/>
            <table className={"itemsTable"}>
              <tbody>
                <tr className={"itemsTh bg-light"}>
                  <td>Name</td>
                  <td>Category</td>
                  <td>Description</td>
                  <td>User</td>
                  <td>Price</td>
                  <td>Purchase Date</td>
                  <td>Purchase Details</td>
                  <td>Purchase Location</td>
                  <td>Weight</td>
                  <td></td>
                </tr>
                { this.props.itemsReducer.items.map( (item,index) => (
                  <tr key={`item_${item.id}`} className={this.rowClass(index)}>
                    <td className={"itemsTd"}>{ item.name }</td>
                    <td className={"itemsTd"}>{ item.category.name }</td>
                    <td className={"itemsTd"}>{ item.description }</td>
                    <td className={"itemsTd"}>{ item.user.username }</td>
                    <td className={"itemsTd"}>{ item.price }</td>
                    <td className={"itemsTd"}>
                      {/* ISO 8601 Date Format (YYYY-MM-DD) */}
                      <Moment format="YYYY - MM - DD">
                        { item.purchaseDate }
                      </Moment>
                    </td>
                    <td className={"itemsTd"}>{ item.purchaseDetails }</td>
                    <td className={"itemsTd"}>{ item.purchaseLocation }</td>
                    <td className={"itemsTd"}>{ item.weight }</td>
                    <td className={"itemsTd"}>
                      {/* TODO Change to roll over icons */}
                      <button
                        id={'delete_button_' + item.id}
                        data-id={item.id}
                        className={'btn btn-dark'}
                        onClick={(e) => this.deleteItem(e.target.getAttribute("data-id"))}>
                        Delete
                      </button>
                      &nbsp;
                      <button
                        className={'btn btn-dark'}
                        onClick={(e) => window.location.href=`/items/${item.id}/edit`}>
                          Edit
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <hr/>
          </Col>
        </Row>
      </Container>
      <Pagination/>
    </div>)
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
        value: { 
                pagination_details: {
                  current_page: new_details.current_page,
                  page_count: new_details.page_count
                }
      }
    }),
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Items);