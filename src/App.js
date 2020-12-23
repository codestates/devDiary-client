import React from "react";
import { Switch, Route, Redirect, withRouter } from "react-router-dom";
import axios from "axios";
import './App.css';
import Login from"./component/Login"
import Hi from"./component/hi"


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
      <div>
      <Switch>

        <Route
          path='/login'
          render={() => (
            <Login handleResponseSuccess={this.handleResponseSuccess.bind(this)} />
          )}
        />
        <Route exact path='/hi' render={() => <Hi />} />
        <Route
            path='/'
            render={() => {
              if (isLogin) {
                return <Redirect to='/hi' />;
              }
              return <Redirect to='/login' />;
            }}
          />
      </Switch>
    </div>
    );
  }
}
export default App;
