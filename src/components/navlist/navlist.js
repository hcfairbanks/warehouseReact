import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Nav, Navbar } from 'react-bootstrap';
import Cookies from 'universal-cookie';

export default class Navlist extends Component {
  submitSignOut() {
    localStorage.setItem("jwt", '');
    localStorage.setItem("role",'')
    localStorage.setItem("username",'')
    const cookies = new Cookies();
    cookies.remove('jwt');
    this.props.history.push('/signIn')
  }
  
  render() {
    return (
      <div className="Nav">
        <Navbar bg="light" expand="lg">
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="/items">Items</Nav.Link>
            <Nav.Link href="/items/new">New Item</Nav.Link>
          </Nav>
          <Nav className="ml-auto">
            <Nav.Link
              href="#"
              onClick={this.submitSignOut.bind(this)}>
                Sign Out
            </Nav.Link>
          </Nav>
          </Navbar.Collapse>
        </Navbar>
      </div>
    );
  }
}