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
  const [tags, setTags] = useState([]);
  useEffect(() => {
    axios.get(`http://localhost:4000/${board}`)
      .then(param => {
        setContents(param.data.list.reverse());
        setTags(param.data.tagList);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [window.location.href]);
  const contentsList = contents.map((ele) => {
    return <BoardListEntry key={ele.id} content={ele} link={link} />
  })
  const tagList = tags && tags.map((item, idx) => {
    return <Link key={idx} className="board-tags-entry" to={`?tag=${item}`}>#{item}</Link>
  })
  console.log(tagList);
  return (
    <div id='boardlist'>
      <Search />
      <div className="board-tags">
        {tagList}
      </div>
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