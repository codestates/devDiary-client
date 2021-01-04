import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import axios from "axios";
import "./css/Userinfo.css"
function Userinfo({ userinfo }) {
  const [ diary, setDiary ] = useState([]);
  const [ quest, setQuestions ] = useState([]);
  useEffect(() => {
    axios.get("http://localhost:4000/user/userinfo")
    .then((param) => {
      setDiary(param.data[0].diaries);
      setQuestions(param.data[0].questions);
    })
  },[])
  return (
    <>
    <div className="userinfo-wrapper">
      <div className="userEntry">
        <div className="userInfo-left">
          <div className="email">Email: {userinfo.email}</div>
          <div className="username">NickName: {userinfo.username}</div>
        </div>
        <div className="userInfo-right">
          <Link to="/user/updateUserinfo"><button id="updateBtn">정보 수정</button></Link>
        </div>
      </div>
      <div className="boards">
        <h3>자유게시판 내가 쓴 글</h3>
        <div className="diary">
          {diary ? (
            diary.map((item, idx) => (<div className="infoEntry" key={idx}>
              <div className="myContentTitle">
                <Link to={`/diary/${item.id}`}>{item.title}</Link>
              </div>
              <div className="myContentInfo">
                <span className="createdAt">{item.createdAt.substring(2,10)}</span>
                <span className="comments">💬 {!item.comments ? 0 : item.comments.length}
                <span className="likes">👍 {!item.likes ? 0 : item.likes.length}</span></span>
              </div>
            </div>))
          ) : (
              <h4>No Content</h4>
            )}
        </div>
        <h3>질문게시판 내가 쓴 글</h3>
        <div >
          {quest ? (
            quest.map((item, idx) => (<div className="infoEntry" key={idx}>
              <div className="myContentTitle">
                <Link to={`/question/${item.id}`}>{item.title}</Link>
              </div>
              <div className="myContentInfo">
                <span className="createdAt">{item.createdAt.substring(2,10)}</span>
                <span className="comments">💬 {!item.comments ? 0 : item.comments.length}</span>
                <span className="likes">👍 {!item.likes ? 0 : item.likes.length} </span>
              </div>
            </div>))
          ) : (
              <h4>No Content</h4>
            )}
        </div>
      </div>
    </div>
    </>
  )
}
export default Userinfo;