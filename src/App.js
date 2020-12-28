import React from "react";


import NavBar from "./component/NavBar"
import {
  BrowserRouter as Router,
  Switch,
  Route, 
  Redirect, 
  withRouter
} from "react-router-dom";
import axios from "axios";
import Login from"./component/Login"
import Userinfo from "./component/Userinfo";
import Hi from"./component/hi"
import Main from "./component/Main";
import SignUp from "./component/SignUp";

import "./App.css";

class App extends React.Component {
  state = {
    isLogin: false,
    userinfo: null,
  };

  handleResponseSuccess() {
    axios.get('http://localhost:4000/userinfo')
    .then(param=>{
      this.setState({ isLogin: true, userinfo: param.data });
    })
  
  }            
            
  render() {
    const { isLogin, userinfo } = this.state;
    
    return (
      <>
        <h1>hi every one</h1>
        <NavBar isLogin={this.state.isLogin}></NavBar>
      <Router>
        <Switch>
      <Route 
          path='/login'
          render={() => (
            <Login handleResponseSuccess={this.handleResponseSuccess.bind(this)} />
          )}
        />
        <Route exact path="/user/userinfo">
          <Userinfo />
        </Route>
        <Route exact path='/login' render={() => <Login />} />
          <Route exact path="/">
            <Main />
          </Route>
          <Route exact path="/user/signUp">
            <SignUp />
          </Route>
        </Switch>
      </Router>
    </>
    );
  }
}
export default App;
