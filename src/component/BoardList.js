import React, { useEffect, useState } from 'react';
import BoardListEntry from './BoardListEntry'
import {Link} from "react-router-dom";
import './css/BoardList.css'
import axios from 'axios';
import Search from "./Search"

function BoardList({ isLogin }) {
  const board = window.location.href.split("/")[3];
  const link = board.split("?")[0]
  const [contents, setContents] = useState([]);
  useEffect(() => {
    axios.get(`http://localhost:4000/${board}`)
    .then(param=>{
      setContents(param.data.list)
    })
  },[]);
  const contentsList = contents.map((ele)=>{
    return <BoardListEntry key={ele.id} content={ele} />
  })
  return (
    <div>
      <Search></Search>
      <div className='list'>
        <ul>
         {contentsList}
        </ul>
      </div>
        {isLogin && <button><Link to={`/${link}/newPost`}>글쓰기</Link></button>}
    </div>
  )
}
export default BoardList