import React from "react";
import NavBar from "./component/NavBar"
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
      <>
        <h1>hi every one</h1>
        <NavBar isLogin={this.state.isLogin}></NavBar>
      <Router>
        <Switch>
          <Route exact path="/">
            <Main />
          </Route>

        </Switch>
      </Router>
    </>
    );
  }
}

export default App;
