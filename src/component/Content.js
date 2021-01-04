import React, { useEffect, useState } from "react";
import axios from "axios";
import { useHistory, Link } from "react-router-dom";
import Search from "./Search"
import "./css/Content.css"
axios.defaults.withCredentials = true;
const Content = function ({ isLogin, username }) {
  const history = useHistory();
  const id = window.location.href.split("/")[4];
  const board = window.location.href.split("/")[3];
  let values = {
    newComment: "",
  };
  let commentMessage = "";
  const [contentData, setContentData] = useState({ data: {} });
  useEffect(() => {
    axios.get(`http://localhost:4000/${board}/${id}`)
      .then((param) => {
        setContentData(param.data);
      })
  }, [])
  const { title, content, likes, comments, createdAt, writer, tags } = contentData.data;
  const { hadLiked } = contentData;
  const tagList = tags && tags.split("#").slice(1).map((item, idx) => {
    return <Link key={idx} className="board-tags-entry" to={`/${board}?tag=${item}`}>#{item}</Link>
  })
  const handleInputValue = (key) => (e) => {
    values[key] = e.target.value;
  }
  const timeFormater = (time = "") => {
    return time.split(".")[0].replace(/-/g, ".").replace("T", " ");
  }
  const handleUpdate = function () {
    history.push(`/${board}/updatePost/${id}`);
  }
  const handleDelete = function () {
    axios.post(`http://localhost:4000/${board}/${id}/deletePost`)
      .then(() => {
        history.push(`/${board}`);
      })
  }
  const handleLikes = function () {
    axios.post(`http://localhost:4000/${board}/${id}/likePost`)
      .then(() => {
        axios.get(`http://localhost:4000/${board}/${id}`)
          .then((param) => {
            setContentData(param.data);
          })
      })
      .catch((err) => console.log(err));
  }
  const handleNewComment = function () {
    if (values.newComment) {
      commentMessage = "";
      axios.post(`http://localhost:4000/${board}/${id}/newComment`, {
        content: values.newComment,
        id: id,
      })
        .then(() => {
          axios.get(`http://localhost:4000/${board}/${id}`)
            .then((param) => {
              document.getElementById("comment").value = "";
              setContentData(param.data);
            })
        })
        .catch((err) => console.log(err));
    } else {
      commentMessage = "내용을 입력해야 합니다";
      console.log(commentMessage)
    }
  }
  return (
    <div className="content-content">
      <Search />
      <div className='content-container'>
        <p className='content-title'>{title}</p>
        <div className='content-info'>
          <p className='content-writer'>{writer}</p>
          <p className='content-time'>{timeFormater(createdAt)}</p>
          {(username === writer)
            && (<>
              <button className='content-update' onClick={handleUpdate}>수정</button>
              <button className='content-delete' onClick={handleDelete}>삭제</button>
            </>)
          }
        </div>
        <div className='content-text' dangerouslySetInnerHTML={{ __html: content }} /> {/* 내용 html 적용, 추천할 만한 방식은 아닌듯 */}
          <div className='content-taglist'>
            tags: {tagList}
          </div>
          <div className='content-like'>
          {isLogin && hadLiked === "true"
              ? <span>한 번 더 좋아요를 누르면 좋아요를 취소 할 수 있습니다</span>
              : <span />
            }
            {isLogin
              ? <button className='content-likeBtn' onClick={handleLikes}>따봉 {likes ? likes.length : 0}</button>
              : <span>따봉 {likes ? likes.length : 0}</span>
            }
          </div>
        {isLogin
          && (
            <div className='content-comment'>
              <input type="text" id="comment" className="content-newComment" onChange={handleInputValue("newComment")} />
              <button className="content-commBtn" onClick={handleNewComment}>등록</button>
              <div>{commentMessage}</div>
            </div>
          ) }
        <div>
        {comments && (
            comments.map((item, idx) => (
            <div key={idx} className='content-commList'>
              <p className='content-commWriter'>{item.writer} </p>
              <p className='content-commText'>{item.content}</p>
              <p className='content-commTime'> {timeFormater(item.createdAt)} </p>
            </div>))
          )}
        </div>
        <button className='content-boardBtn' onClick={() => { history.push(`/${board}`) }}>목록</button>
      </div>
    </div>)
}
export default Content;