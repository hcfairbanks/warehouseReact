import React, { Component } from 'react';
import axios from 'axios';
import { baseUrl } from '../../config/config';
import '../../css/items.scss';

class UsersDropDown extends Component {
  constructor(props){
    super(props);
    this.state = {
      users: []
    }
  }

  componentDidMount(){
    this.getUsers();
  }

  async getUsers(){
    let res = await axios.get(`${baseUrl}/auth/users?page=1`,
    { withCredentials: true } );
    this.state.users = res.data.users
  }

  render(){
    const userOptions = this.state.users.map((user) =>
      <option
        key={`usersId_${user.id}`}
        value={user.id}>
          {user.username}
      </option> 
    );

    return (
    <div className="Users">
      <select
        id={this.props.id}
        className={this.props.className}>
          <option
            value={""}
            defaultValue>
            User
          </option>
          {userOptions}
      </select>
    </div>)}
}

export default UsersDropDown;