import React, { useState } from "react";
import { Link } from "react-router-dom";
import './css/Search.css'
function Search() {
  const board = window.location.href.split("/")[3].split('?')[0];
  // const boardname = board.split('?')[0]
  const [ keyword, setKeyword ] = useState("");
  const getKeyword = (e) => {
    setKeyword(e.target.value);
  }
  return (
    <div id='sea'>
      <p className='boardname'>{board}</p>
      <span className='boardinfo'>diary는 하루동안 개발공부를 하며 어찌구한 일을 자유롭게 어찌구 하는 게시판입니다</span>
       <input id='inp' type="text" onChange={getKeyword} />
       <button id='sear'><Link to={`/${board}?q=${keyword}`}>검색</Link></button>
    </div>
  )
}

export default Search;