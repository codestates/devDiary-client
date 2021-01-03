import React, { useState } from "react";
import { Link } from "react-router-dom";
import './css/Search.css'
function Search() {
  const board = window.location.href.split("/")[3].split('?')[0];
  const [keyword, setKeyword] = useState("");
  const getKeyword = (e) => {
    setKeyword(e.target.value);
  }
  const clearInp = () => {
    document.getElementById("inp").value = "";
    setKeyword("");
  }
  return (
    <div id='sea'>
      <p className='boardname'>{board}</p>
      <span className='boardinfo'>diary는 하루동안 개발공부를 하며 어찌구한 {/*일을 자유롭게 어찌구 하는 게시판입니다*/}</span>
      <input id='inp' type="text" onChange={getKeyword} />
      <Link to={
        keyword
        ? `/${board}?q=${keyword}`
        : `/${board}`
      }>
        <button id='sear' onClick={clearInp}>검색</button>
      </Link>
    </div>
  )
}

export default Search;
