import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import axios from "axios";

import Main from "./component/Main";

import './App.css';

class App extends React.Component {
  state = {
    isLogin: false,
    userinfo: null,
  };

  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/">
            <Main />
          </Route>

        </Switch>
      </Router>
    );
  }
}

export default App;
