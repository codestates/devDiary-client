import React from "react";
import { Link } from "react-router-dom";
import "./css/Main.css";

function Main() {
  return (
    <div className="main">
      <Link className="main-link1" to="/diary">
        <button className="main-btn-D"></button>
      </Link>
      <Link className="main-link2" to="/question">
        <button className="main-btn-Q"></button>
      </Link>
    </div>
  )
}

export default Main;