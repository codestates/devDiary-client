import React from "react";
import { Link } from "react-router-dom";

function Main() {
  return (<>
    <Link to="/diary">자유게시판</Link>
    <Link to="/question">질문게시판</Link>
  </>)
}

export default Main;