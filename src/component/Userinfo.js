import React from 'react';
import { useHistory, Link } from "react-router-dom";

function Userinfo({ userinfo, userContents, handlePost }) {
  const history = useHistory();
  function updateUserinfo() {
    history.push("/user/updateUserinfo");
  }
  //* 서버 응답 형태에 따라 바뀔 수 있음 ↓
  const diary = userContents.diary;
  const quest = userContents.question;
  //* 서버 응답 형태에 따라 바뀔 수 있음 ↑
  return (
    <>
      <div className="userinfo">
        <h1>Userinfo</h1>
        <div className="email">Email: {userinfo.email}</div>
        <div className="username">NickName: {userinfo.username}</div>
        <button className="btn-updateUserinfo" onClick={updateUserinfo}>회원정보 수정</button>
      </div>
      <div className="boards">
        <h3>작성하신 일기장 목록 입니다</h3>
        <div className="diary">
          {diary ? (
            diary.map((item, idx) => (<div key={idx}>
              <Link onClick={() => (handlePost("diary", item.id))}>{item.title}</Link>
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
              <Link onClick={() => (handlePost("question", item.id))}>{item.title}</Link>
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
