import React from "react";
import {
  BrowserRouter as Router,
  Link
} from "react-router-dom";
import "./css/Main.css";

function Main() {
  return (<>
    <Router>
      <Link to="/diary">자유게시판</Link>
      <Link to="/question">질문게시판</Link>
    </Router>

  </>)
}

export default Main;
