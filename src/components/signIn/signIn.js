import React, { Component } from 'react';
import axios from 'axios';
import * as jwt from 'jsonwebtoken';
import * as validator from 'validator';
import Cookies from 'universal-cookie';
import { baseUrl } from '../../config/config';
import { Container, Row, Col } from 'react-bootstrap';

export default class SignIn extends Component {
  constructor(props){
    super(props);
    this.state = {
                    email: '',
                    password: '',
                    error_message: ''
                  };
  }

  emailChangeHandler = (event) => {
    this.setState({email: event.target.value});
  }

  passwordChangeHandler = (event) => {
    this.setState({password: event.target.value});
  }

  async submitSignIn() {
    if ( validator.isEmail(this.state.email) &&
          this.state.password !== undefined &&
          validator.isLength(this.state.password, {min: 8})){
          this.setState({error_message: ''}); 

          const params = {
            email: this.state.email,
            password: this.state.password,
          }

        let res = await axios.post(`${baseUrl}/auth/signin`,
                                    params).then(function (response) {
          return response
        })
        .catch(function (error) {
          this.setState({error_message: 'Login Failed'}); 
        }.bind(this));
        if (res !== undefined){
          let accessObject = await jwt.decode(res.data.accessToken);
          localStorage.setItem("jwt", res.data.accessToken);
          localStorage.setItem("role", accessObject.role)
          localStorage.setItem("username", accessObject.username)
          localStorage.setItem("id", accessObject.id)
          const cookies = new Cookies();
          cookies.set('jwt', res.data.accessToken, [{ httpOnly: true }]);
          this.props.history.push('/items')
        }
      }
    else{
      console.log('not valid')
      this.setState(
        {
          error_message: 'Please enter a valid email and password'
        }
      ); 
    }
  }

  render(){
    return (
    <div className="SignIn">
      <Container>
        <Row className={"show-grid"}>
          <Col md={4}></Col>
          <Col md={4}>
            <form id='signin_form' style={{marginTop: "95px"}}>
              <input
                type='text'
                id='email'
                className={"form-control"}
                placeholder={'Email'}
                onChange={this.emailChangeHandler}
              />
              <br/>
              <input
                type='password'
                id='password'
                className={"form-control"}
                placeholder={'Password'}
                onChange={this.passwordChangeHandler}
              />
              <div
                id="error_message">
                  {this.state.error_message}&nbsp;
              </div>
            </form>
            <button
              onClick={this.submitSignIn.bind(this)}
              className={"btn btn-outline-primary"}>
              Submit
            </button>
          </Col>
          <Col md={4}></Col>
        </Row>
      </Container>
    </div>
  )}
}