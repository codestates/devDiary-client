import React from "react";
import NavBar from "./component/NavBar"
import {
  BrowserRouter as Router,
  Switch,
  Route,
  withRouter
} from "react-router-dom";
import axios from "axios";
import Login from"./component/Login"
import Userinfo from "./component/Userinfo";
import Main from "./component/Main";
import SignUp from "./component/SignUp";
import "./App.css";
class App extends React.Component {
  state = {
    isLogin: false,
    userinfo: {
      username:'chacha'
    },
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
        <Router>
          <NavBar isLogin={this.state.isLogin} username={this.state.userinfo.username}></NavBar>
          <Switch>
            <Route path='/user/login'>
              <Login handleResponseSuccess={this.handleResponseSuccess.bind(this)} />
            </Route>
            <Route exact path="/user/userinfo">
              <Userinfo />
            </Route>
            <Route exact path='/'>
              <Main />
            </Route>
            <Route path='/user/signup'>
              <SignUp />
            </Route>
          </Switch>
        </Router>
      </>
    );
  }
}
export default withRouter(App);
