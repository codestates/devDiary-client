import React from "react";
import {
  Switch,
  Route,
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
    const { userdata } = this.state;
    return (
      <Switch>
        <Route
            exact
            path='/user/userinfo'
            render={() => (
              <Userinfo userdata={userdata} />
            )}
          />
      </Switch>
    );
  }
}

export default App;
