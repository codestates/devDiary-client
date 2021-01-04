import React, { useEffect, useState } from 'react';
import BoardListEntry from './BoardListEntry'
import { useHistory, Link } from "react-router-dom";
import './css/BoardList.css'
import axios from 'axios';
import Search from "./Search"

function BoardList({ isLogin }) {
  const history = useHistory();
  const [board, setBoard] = useState(window.location.href.split("/")[3]);
  const [query, setQuery] = useState("");
  const [contents, setContents] = useState([]);
  const [tags, setTags] = useState([]);
  history.listen((location) => {
    setQuery(location.search);
    setBoard(location.pathname.substr(1));
  });
  useEffect(() => {
    axios.get(`http://localhost:4000/${board + query}`)
      .then(param => {
        setContents(param.data.list.reverse());
        setTags(param.data.tagList);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [window.location.href]);
  const contentsList = contents.map((ele) => {
    return <BoardListEntry key={ele.id} content={ele} board={board} />
  })
  const tagList = tags && tags.map((item, idx) => {
    return <Link key={idx} className="board-tags-entry" to={`?tag=${item}`}>#{item}</Link>
  })
  return (
    <div className='boardlist'>
      <Search />
      <div className="board-tags">
        인기태그: {tagList}
      {isLogin && <Link to={`/${board}/newPost`}><button className='write-button'>글쓰기</button></Link>}
      </div>
      <div className='content-list'>
        <div className="board-category-wrapper">
          <div className="board-category-title">제목</div>
          <div className="board-category-entry-info">
            <span className="board-category-writer">작성자</span>
            <span className="board-category-createdAt">작성일</span>
            <span className="board-category-comments">댓글</span>
            <span className="board-category-likes">좋아요</span>
          </div>
        </div>
        {contentsList}
      </div>
    </div>
  )
}
export default BoardList;
