import React from "react";
import { Link } from "react-router-dom";

function Main() {
  return (
    <div className="main">
      <Link className="link" to="/diary">
        <button className="butn">Diary</button>
      </Link>
      <Link className="link" to="/question">
        <button className="butn">Question</button>
      </Link>
    </div>
  )
}

export default Main;