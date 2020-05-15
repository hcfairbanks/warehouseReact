import React, { Component } from 'react';
import axios from 'axios';
import { baseUrl } from '../../config/config';
import '../../css/items.scss';

class CategoriesDropDown extends Component {
  constructor(props){
    super(props);
    this.state = {
      categories: []
    }
  }

  componentDidMount(){
    this.getCategories();
  }

  async getCategories(){
    let res = await axios.get(`${baseUrl}/categories?page=1`,
    { withCredentials: true } );
    this.state.categories = res.data.categories
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
    <div className="Categories">
      <select
        id={this.props.id}
        className={this.props.className}>
          <option
            value={""}
            defaultValue>
            Category
          </option>
          {categoryOptions}
      </select>
    </div>)}
}

export default CategoriesDropDown;