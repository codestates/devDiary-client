import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import axios from "axios";

import NavBar from "./component/NavBar"
import Login from "./component/Login"
import Main from "./component/Main";
import SignUp from "./component/SignUp";

import "./App.css";

class App extends React.Component {
  state = {
    isLogin: false,
    userinfo: null,
  };

  handleResponseSuccess() {
    axios.get('http://localhost:4000/user/userinfo')
      .then(param => {
        this.setState({ isLogin: true, userinfo: param.data });
      })

  }

  render() {
    return (
      <>
        <h1>hi every one</h1>
        <NavBar isLogin={this.state.isLogin}></NavBar>
        <Router>
          <Switch>
            <Route
              path='/user/login'
              render={() => (
                <Login handleResponseSuccess={this.handleResponseSuccess.bind(this)} />
              )}
            />
            <Route exact path='/'> 
              <Main /> 
            </Route>
            <Route exact path='/user/signup'>
              <SignUp />
            </Route>
          </Switch>
        </Router>
      </>
    );
  }
}
export default App;
