import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  withRouter,
} from "react-router-dom";
import axios from "axios";
import Login from "./component/Login"
import NavBar from "./component/NavBar"
import Userinfo from "./component/Userinfo";
import BoardList from "./component/BoardList";
import Main from "./component/Main";
import SignUp from "./component/SignUp";
import WritingContent from "./component/WritingContent";
import UpdateUserInfo from "./component/UpdateUserInfo";
import Content from "./component/Content";

import "./App.css";

class App extends React.Component {
  state = {
    isLogin: false,
    userinfo: {
      email: null,
      username: null,
    },
  };
  handleResponseSuccess(param) {
    this.setState({
      isLogin: true,
      userinfo: {
        username: param.username,
        email: param.email
      }
    });
  }
  
  handleLogout(){
    axios.post("http://localhost:4000/user/logout",null,{withCredentials:true})
    .then(()=>{
      window.sessionStorage.clear()
    })
    .then(()=>{
      this.props.history.push("/")
    })
    .then(()=>{
      this.setState(
        {isLogin:false,
        userinfo:{
          email:null,
          username:null
        }}
        )
    })
  }
  componentDidMount(){
    if(window.sessionStorage.isLogin){
      this.setState({
        isLogin: true,
        userinfo: {
          email: window.sessionStorage.email,
          username: window.sessionStorage.username,
        }
      })
    }
  }

  render() {
    return (
      <>
        <h1>hi every one</h1>
        <Router>
          {this.state.isLogin === true
            ? (
              <NavBar
                isLogin={this.state.isLogin}
                username={this.state.userinfo.username}
                handleLogout={this.handleLogout.bind(this)}
              ></NavBar>
            )
            : (
              <NavBar isLogin={this.state.isLogin}></NavBar>
            )
          }
          <Switch>
            <Route path='/user/login'>
              <Login handleResponseSuccess={this.handleResponseSuccess.bind(this)} />
            </Route>
            <Route exact path="/">
              <Main />
            </Route>
            <Route exact path="/user/signUp">
              <SignUp />
            </Route>
            <Route exact path="/user/userinfo">
              <Userinfo
                userinfo={this.state.userinfo}
              />
            </Route>
            <Route path='/user/updateUserinfo/:id'>
              <UpdateUserInfo userinfo={this.state.userinfo} />
            </Route>
            <Route path='/diary'>
              <BoardList isLogin={this.state.isLogin} />
            </Route>
            <Route path='/question'>
              <BoardList isLogin={this.state.isLogin} />
            </Route>
            <Route path="/diary/newPost">
              <WritingContent />
            </Route>
            <Route path="/question/newPost">
              <WritingContent />
            </Route>
            <Route path="/diary/updatePost/:id">
              <WritingContent />
            </Route>
            <Route path="/question/updatePost/:id">
              <WritingContent />
            </Route>

            <Route path="/diary/:id">
              <Content
                isLogin={this.state.isLogin}
                username={this.state.userinfo.username}
              />
            </Route>
            <Route path="/question/:id">
              <Content
                isLogin={this.state.isLogin}
                username={this.state.userinfo.username}
              />
            </Route>

          </Switch>
        </Router>
      </>
    );
  }
}
export default withRouter(App);
