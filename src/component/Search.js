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
      <span className='boardinfo'>
        {board==="diary" 
          ? "개발 일지를 자유롭게 올려보세요"
          : "궁금한 점을 공유 해 보세요"
        }
        
      </span>
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
