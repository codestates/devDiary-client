import React, { useEffect, useState } from 'react';
import BoardListEntry from './BoardListEntry'
import {Link} from "react-router-dom";
import './css/BoardList.css'
import axios from 'axios';
import Search from "./Search"

function BoardList({ isLogin }) {
  const board = window.location.href.split("/")[3];
  const boa = window.location.href
  const link = board.split("?")[0]
  const [contents, setContents] = useState([]);
  useEffect(() => {
    axios.get(`http://localhost:4000/${board}`)
    .then(param=>{
      setContents(param.data.list)
    })
    .then(()=>{
      console.log(boa)
    })
    .catch(()=>{
      console.log('오류오류')
    })
  },[boa]);
  const contentsList = contents.map((ele)=>{
    return <BoardListEntry key={ele.id} content={ele} link={link} />
  })
  return (
    <div id='boardlist'>
      <Search></Search>
      {isLogin && <button className='write_button'><Link to={`/${link}/newPost`}>글쓰기</Link></button>}
      <div className='list'>
        <ul>
         {contentsList}
        </ul>
      </div>

    </div>
  )
}
export default BoardList