import React, { Component } from 'react';
import { connect } from 'react-redux';
import Cookies from 'universal-cookie';
import Navlist from '../navlist/navlist'

class About extends Component {
  reduxTest() {
    console.log(localStorage.getItem('role'))
    this.props.changeCatColor();
  }

  readCookieBtn(){
    const cookies = new Cookies();
    console.log(cookies.get('jwt'));
  }

  render(){
    return (
    <div className="SignIn">
      <Navlist history={this.props.history}/>
      <h1>Color of the cat: {this.props.aboutReducer.color}</h1>
      <div key={this.props.cats}>{this.props.color}</div>
      <button onClick={this.props.changeCatColor}>mapDispatchToProps</button>    
      <button onClick={this.reduxTest.bind(this)}>Click the button</button>
      <button onClick={this.readCookieBtn.bind(this)}>Read Cookie</button>
    </div>
    )
  }
}

const mapStateToProps = ( state ) => {
  return {
    aboutReducer: {
      color: state.aboutReducer.color
    }
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    changeCatColor: () => dispatch({type:'CHANGE_CAT_COLOR', value: 'Orange'})
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(About);