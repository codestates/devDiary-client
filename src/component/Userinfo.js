import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import axios from "axios";

function Userinfo({ userinfo }) {
  const [ diary, setDiary ] = useState({});
  const [ quest, setQuestions ] = useState("");
  useEffect(() => {
    axios.get("http://localhost:4000/user/userinfo")
    .then((param) => {
      setDiary(param.data.diarys);
      setQuestions(param.data.questions);
    })
  },[])

  return (
    <>
      <div className="userinfo">
        <h1>Userinfo</h1>
        <div className="email">Email: {userinfo.email}</div>
        <div className="username">NickName: {userinfo.username}</div>
        <button><Link to="/user/updateUserinfo">회원정보 수정</Link></button>
      </div>
      <div className="boards">
        <h3>작성하신 일기장 목록 입니다</h3>
        <div className="diary">
          {diary ? (
            diary.map((item, idx) => (<div key={idx}>
              <Link to={`/diary/${item.id}`}>{item.title}</Link>
              <span className="created_at">{item.created_at}</span>
              <span>댓글:({item.comments})</span>
              <span>공감:({item.likes})</span>
            </div>))
          ) : (
              <h4>No Content</h4>
            )}
        </div>
        <h3>작성하신 질문 목록 입니다</h3>
        <div className="question">
          {quest ? (
            quest.map((item, idx) => (<div key={idx}>
              <Link to={`/question/${item.id}`}>{item.title}</Link>
              <span className="created_at">{item.created_at}</span>
              <span>댓글:({item.comments})</span>
              <span>공감:({item.likes})</span>
            </div>))
          ) : (
              <h4>No Content</h4>
            )}
        </div>
      </div>
    </>
  )
}

export default Userinfo;
