import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import Navlist from '../navlist/navlist'
import DatePicker from 'react-datepicker';
import { validateItem } from '../../lib/validation';
import { baseUrl } from '../../config/config';

const inputIds = ['name','description','price','weight','categoryId','userId'];

class editItem extends Component {
  constructor(props){
    super(props);
    this.state = {
      // Linux Epoch Date '1970-01-01'
      // If you ever see this date anywhere
      // you know something strange is happening
      purchaseDate: '1970-01-01',
      categories: []
    }
  };
  
  componentDidMount(){
    this.getItem();
    this.getCategories();
  }

  async getItem(){
    const itemId = this.props.match.params.id;
    let res = await axios.get(`${baseUrl}/items/${itemId}`,
                              { withCredentials: true } );
    this.setState(res.data);
  }

  async getCategories(){
    let res = await axios.get(`${baseUrl}/categories?page=1`,
                              { withCredentials: true } );
    this.setState({categories: res.data.categories });
  }

  inputChangeHandler(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  changePurchaseDate = (date) => {
    this.setState({
      purchaseDate: date
    });
  };

  async updateItem(){
    try {
      if (validateItem(inputIds)){
        let res = await axios.patch(`${baseUrl}/items/${this.state.id}`,
                                    {'updateItem': this.state },
                                    { withCredentials: true } );
        if (res.status === 200){
           document.getElementById('error_msg').innerHTML = "Item Edited"; 
           document.getElementById('error_msg').className = "alert alert-success";
         } else {
          document.getElementById('error_msg').innerHTML += "There was an error";
          document.getElementById('error_msg').className = "alert alert-danger";
         }
     }
    }catch(error){
      document.getElementById('error_msg').innerHTML += "There was an error";
      document.getElementById('error_msg').className = "alert alert-danger";
    }
  }

  render(){
    const categoryOptions = this.state.categories.map((category) =>
      <option
        key={`categoryId_${category.id}`}
        value={category.id}>
          {category.name}
      </option> 
    );
    return (
      <div className="Item">
      <Navlist history={this.props.history}/>
      <h3>Edit Item</h3>
      <Container>
        <Row className={"show-grid"}>
        <Col md={4}></Col>
          <Col md={4}>
          <div id="error_msg"></div>
            <div key={`item_${this.state.id}`}>
              <table className={"itemTable"}>
                <tbody>
                  <tr className={"itemTr bg-light"}>
                    <td>Name</td>
                    <td className={"itemTd"}>
                      <input
                        id={"name"}
                        className={"form-control"}
                        name={"name"}
                        type={"text"}
                        defaultValue={this.state.name}
                        onChange={e => this.inputChangeHandler(e)}
                      />
                    </td>
                  </tr>
                  <tr className={"itemTr bg-light"}>
                    <td>Category Id</td>
                    <td className={"itemTd"}>
                      <select
                        id={"categoryId"}
                        className={"form-control"}
                        name={"categoryId"}
                        defaultValue={this.state.categoryId}
                        onChange={e => this.inputChangeHandler(e)}
                        >
                        { categoryOptions }
                      </select>
                    </td>
                  </tr>
                  <tr className={"itemTr bg-light"}>
                    <td>Description</td>
                    <td className={"itemTd"}>
                      <textarea
                        id={"description"}
                        className={"form-control"}
                        name={"description"}
                        type={"textArea"}
                        rows={"1"}
                        cols={"1"}
                        defaultValue={this.state.description}
                        onChange={e => this.inputChangeHandler(e)}
                      />
                    </td>
                  </tr>
                  <tr className={"itemTr bg-light"}>
                    <td>Price</td>
                    <td className={"itemTd"}>
                      <input
                        id={"price"}
                        className={"form-control"}
                        name={"price"}
                        type={"number"}
                        step={"0.01"}
                        min={"0.00"}
                        defaultValue={this.state.price}
                        onChange={e => this.inputChangeHandler(e)}
                      />
                    </td>
                  </tr>
                  <tr className={"itemTr bg-light"}>
                    <td>Purchase Date</td>
                    <td className={"itemTd"}>
                      <DatePicker
                        id={"purchaseDate"}
                        className={"form-control"}
                        name={"purchaseDate"}
                        selected={new Date (this.state.purchaseDate)}
                        onChange={this.changePurchaseDate}
                        dateFormat="yyyy-MM-dd"
                      />
                    </td>
                  </tr>
                  <tr className={"itemTr bg-light"}>
                    <td>Purchase Details</td>
                    <td className={"itemTd"}>
                      <input
                        id={"purchaseDetails"}
                        className={"form-control"}
                        name={"purchaseDetails"}
                        type={"text"}
                        defaultValue={this.state.purchaseDetails}
                        onChange={e => this.inputChangeHandler(e)}
                      />
                    </td>
                  </tr>
                  <tr className={"itemTr bg-light"}>
                    <td>Purchase Location</td>
                    <td className={"itemTd"}>
                      <input
                        id={"purchaseLocation"}
                        className={"form-control"}
                        name={"purchaseLocation"}
                        type={"text"}
                        defaultValue={this.state.purchaseLocation}
                        onChange={e => this.inputChangeHandler(e)}
                      />
                    </td>
                  </tr>
                  <tr className={"itemTr bg-light"}>
                    <td>User Id</td>
                    <td className={"itemTd"}>
                      <input
                        id={"userId"}
                        className={"form-control"}
                        name={"userId"}
                        type={"number"}
                        step={"1"}
                        min={"1"}
                        defaultValue={this.state.userId}
                        onChange={e => this.inputChangeHandler(e)}
                      />
                    </td>
                  </tr>
                  <tr className={"itemTr bg-light"}>
                    <td>Weight</td>
                    <td className={"itemTd"}>
                      <input
                        id={"weight"}
                        className={"form-control"}
                        name={"weight"}
                        type={"number"}
                        step={"0.01"}
                        min={"0.00"}
                        defaultValue={this.state.weight}
                        onChange={e => this.inputChangeHandler(e)}
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
              <button
                className={"btn btn-outline-primary"}
                onClick={this.updateItem.bind(this)}>
                Update Item
              </button>
            </div>
          </Col>
          <Col md={4}></Col>
        </Row>
      </Container>
    </div>
    )
  }
}

export default editItem;