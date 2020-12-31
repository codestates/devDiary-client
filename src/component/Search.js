import React, { useState } from "react";
import { Link } from "react-router-dom";
​
function Search() {
  const board = window.location.href.split("/")[3];
  const [ keyword, setKeyword ] = useState("");
​
  const getKeyword = (e) => {
    setKeyword(e.target.value);
    console.log(keyword);
  }
​
  return (
    <div>
      <input type="text" onChange={getKeyword} />
      <button><Link to={`/${board}?q=${keyword}`}>검색</Link></button>
    </div>
  )
}
​
export default Search;