import React from "react";
import { Link } from "react-router-dom";
import './css/Main.css'

function Main() {
  return (
  <div id='main'>
    <Link to="/diary">자유게시판</Link>
    <Link to="/question">질문게시판</Link>
  </div>
  )
}

export default Main;