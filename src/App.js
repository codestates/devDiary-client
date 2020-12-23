import React from "react";
import {
  Switch,
  Route,
} from "react-router-dom";
// import axios from "axios";

import Main from "./component/Main";
import SignUp from "./component/SignUp";

import "./App.css";

class App extends React.Component {
  state = {
    isLogin: false,
    userinfo: null,
  };

  render() {
    return (
      <Switch>
        <Route exact path="/">
          <Main />
        </Route>
        <Route exact path="/user/signUp">
          <SignUp />
        </Route>
      </Switch>
    );
  }
}

export default App;
