import React, { useEffect, useState } from 'react';
import BoardListEntry from './BoardListEntry'
import { useHistory, Link } from "react-router-dom";
import './css/BoardList.css'
import axios from 'axios';
import Search from "./Search"

function BoardList({ isLogin }) {
  const history = useHistory();
  let board = window.location.href.split("/")[3];
  let query = "";
  const [contents, setContents] = useState([]);
  const [tags, setTags] = useState([]);
  useEffect(() => {
    history.listen((location) => {
      query = location.search;
      board = location.pathname.substr(1);
      if(board === "diary" || board === "question" || query) {
        getList();
      }
    });
    getList();
  }, [window.location.href]);
  const getList = () => {
    axios.get(`http://localhost:4000/${board+query}`)
      .then(param => {
        setContents(param.data.list.reverse());
        setTags(param.data.tagList);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  const contentsList = contents.map((ele) => {
    return <BoardListEntry key={ele.id} content={ele} board={board} />
  })
  const tagList = tags && tags.map((item, idx) => {
    return <Link key={idx} className="board-tags-entry" to={`?tag=${item}`}>#{item}</Link>
  })
  return (
    <div id='boardlist'>
      <Search />
      <div className="board-tags">
        {tagList}
      </div>
      {isLogin && <Link to={`/${board}/newPost`}><button className='write_button'>글쓰기</button></Link>}
      <div className='list'>
        <ul>
          {contentsList}
        </ul>
      </div>
    </div>
  )
}
export default BoardList
