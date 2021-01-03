import React, { useEffect, useState } from 'react';
import BoardListEntry from './BoardListEntry'
import { Link } from "react-router-dom";
import './css/BoardList.css'
import axios from 'axios';
import Search from "./Search"

function BoardList({ isLogin }) {
  const board = window.location.href.split("/")[3];
  const link = board.split("?")[0]
  const [contents, setContents] = useState([]);
  useEffect(() => {
    axios.get(`http://localhost:4000/${board}`)
      .then(param => {
        setContents(param.data.list)
      })
      .then(() => {
        console.log(window.location.href)
      })
      .catch((err) => {
        console.log(err);
      });
  }, [window.location.href]);
  const contentsList = contents.reverse().map((ele) => {
    return <BoardListEntry key={ele.id} content={ele} link={link} />
  })
  return (
    <div id='boardlist'>
      <Search></Search>
      {isLogin && <Link to={`/${link}/newPost`}><button className='write_button'>글쓰기</button></Link>}
      <div className='list'>
        <ul>
          {contentsList}
        </ul>
      </div>

    </div>
  )
}
export default BoardList