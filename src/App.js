import React from "react"
import NavBar from "./component/NavBar"

import './App.css';

class App extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      isLogin : false,
    }
  }

  render(){
    return(
      <>
        <h1>hi every one</h1>
        <NavBar isLogin={this.state.isLogin}></NavBar>
      </>
    )
  }
}

export default App;
