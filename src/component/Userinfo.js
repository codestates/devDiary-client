import React from 'react';
import axios from "axios";
import { useHistory } from "react-router-dom";
function Userinfo(props) {
  const history = useHistory();
  function updateUserinfo() {
    history.push("/user/updateUserinfo");
  }
  function getContent(board, id) {
    axios.get(`http://localhost:4000/${board}/${id}`)
    .then(() => {
      history.push(`/${board}/${id}`);
    })
  }
  //* 서버 응답 형태에 따라 바뀔 수 있음 ↓
  const userinfo = props.userdata.userinfo;
  const diary = props.userdata.contents.freeTable;
  const quest = props.userdata.contents.queTable;
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
            diary.map((item, idx) => (<div key={idx}>{/** 버튼 css 변경 필요 ↓ */}
              <button href="" onClick={getContent("diary", item.id)}>{item.title}</button>
              <span className="created_at">{item.created_at}</span>
              <span>댓글:({item.comment.length})</span>
              <span>공감:({item.likes})</span>
            </div>))
          ) : (
            <h4>No Content</h4>
          )}
        </div>
        <h3>작성하신 질문 목록 입니다</h3>
        <div className="question">
          {quest ? (
            quest.map((item, idx) => (<div key={idx}>{/** 버튼 css 변경 필요 ↓ */}
              <button onClick={getContent("question", item.id)}>{item.title}</button>
              <span className="created_at">{item.created_at}</span>
              <span>댓글:({item.comment.length})</span>
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