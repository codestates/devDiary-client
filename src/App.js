import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
// import axios from "axios";

import Userinfo from "./component/Userinfo";

import "./App.css";

class App extends React.Component {
  state = {
    isLogin: false,
    userdata: null,
  };

  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/user/userinfo">
            <Userinfo />
          </Route>
        </Switch>
      </Router>
    );
  }
}

export default App;
