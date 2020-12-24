import React from "react";


import UpdateUserInfo from "./component/UpdateUserInfo";


class App extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      isLogin: true,
      userinfo: {
        email:'codbs54@gmail.com',
        username:'yullmoo',
        password:'dudrbs0511'
    }
}
  };
  

  render() {
  
    return (
      <UpdateUserInfo userinfo={this.state.userinfo}></UpdateUserInfo>
    );
  }
}
export default (App);
