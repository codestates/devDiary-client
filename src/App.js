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
import Login from "./component/Login"
import Main from "./component/Main";
import SignUp from "./component/SignUp";
import WritingContent from "./component/WritingContent";

import "./App.css";

class App extends React.Component {
  state = {
    isLogin: false,
    userinfo: null,
    preData: null,
  };

  handleResponseSuccess() {
    axios.get('http://localhost:4000/userinfo')
      .then(param => {
        this.setState({ isLogin: true, userinfo: param.data });
      })
  }

  handleDiaryPost(id) {
    axios.get(`http://localhost:4000/diary/updatePost/${id}`)
      .then(param => {
        this.setState({ preData: param.data });
        this.props.history.push(`/diary/updatePost/${id}`);
      })
  }
  handleQuestionPost(id) {
    axios.get(`http://localhost:4000/question/updatePost/${id}`)
      .then(param => {
        this.setState({ preData: param.data });
        this.props.history.push(`/question/updatePost/${id}`);
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
              path='/login'
              render={() => (
                <Login handleResponseSuccess={this.handleResponseSuccess.bind(this)} />
              )}
            />
            <Route exact path='/login' render={() => <Login />} />
            <Route exact path="/">
              <Main />
            </Route>
            <Route exact path="/user/signUp">
              <SignUp />
            </Route>

            <Route path="/diary/newPost">
              <WritingContent />
            </Route>
            <Route path="/question/newPost">
              <WritingContent />
            </Route>
            <Route path="/question/updatePost">
              <WritingContent preData={this.state.preData} />
            </Route>
            <Route path="/question/updatePost">
              <WritingContent preData={this.state.preData} />
            </Route>

          </Switch>
        </Router>
      </>
    );
  }
}
export default App;
