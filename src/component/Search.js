import React, { useState } from "react";
import { Link } from "react-router-dom";
function Search() {
  const board = window.location.href.split("/")[3];
  const [ keyword, setKeyword ] = useState("");
  const getKeyword = (e) => {
    setKeyword(e.target.value);
  }
  return (
    <div>
      <input type="text" onChange={getKeyword} />
      <Link to={`/${board}?q=${keyword}`}>
        <button>검색</button>
      </Link>
    </div>
  )
}

export default Search;
