import React from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

axios.defaults.withCredentials = true;

const Content = function ({ isLogin, username, singleContent, handlePost }) {
  const history = useHistory();
  const id = window.location.href.split("/")[4];
  const board = window.location.href.split("/")[3];
  const { title, content, likes, comments, createdAt, writer, hadLiked } = singleContent;
  let values = {
    keyword: "",
    newComment: "",
  };

  const handleInputValue = (key) => (e) => {
    values[key] = e.target.value;
  }

  const search = function () {
    //TODO 검색기능 -> 컴포넌트 분리 예정
    console.log(values.keyword);
    console.log("searching!!!!!!!!!!!!!!!");
  }
  const handleUpdate = function () {
    handlePost(board, id)
      .then(() => {
        history.push(`/${board}/updatePost/${id}`);
      })
  }
  const handleDelete = function () { //TODO 모달창 필요할듯
    axios.post(`http://localhost:4000/${board}/deletePost/${id}`)
      .then(() => {
        history.push(`/${board}`);
      })
  }
  const handleLikes = function () {
    axios.post(`http://localhost:4000/${board}/${id}/like/`)
      .then(() => {
        handlePost(board, id)
      })
      .then(() => {
        history.replace(`/${board}/${id}`);
      })
      .catch((err) => console.log(err))
  }
  const handleNewComment = function () {
    axios.post(`http://localhost:4000/${board}/${id}/newComment`, {
      writer: username,
      content: values.newComment,
      id: id,
    })
      .then(() => {
        history.replace(`/${board}/${id}`);
      })
  }
  return (<>
    <div>검색:
        <input type="text" className="keyword" onChange={handleInputValue("keyword")} />
      <button onClick={search}>검색</button>
    </div>
    <div>제목: {title}</div>
    <div>
      <span>{writer}</span>
      <span>{createdAt}</span>
      {(username === writer)
        ? (<>
          <button onClick={handleUpdate}>수정</button>
          <button onClick={handleDelete}>삭제</button>
        </>) : <></>
      }
    </div>
    <div dangerouslySetInnerHTML={{ __html: content }} /> {/* 내용 html 적용, 추천할 만한 방식은 아닌듯 */}
    <div>
      {isLogin
        ? <button onClick={handleLikes}>따봉 {likes}</button>
        : <span>따봉 {likes}</span>
      }{isLogin && hadLiked
        ? <span>한 번 더 좋아요를 누르면 좋아요를 취소 할 수 있습니다</span>
        : <span />
      }
    </div>
    {isLogin
      ? (
        <div>댓글작성:
          <input type="text" className="newComment" onChange={handleInputValue("newComment")} />
          <button onClick={handleNewComment}>등록</button>
        </div>
      ) : (
        <></>
      )}
    <div>
      댓글들:
        {comments ? (
        comments.map((item, idx) => (<div key={idx}>
          <span>작성자: {item.writer} </span>
          <span> 댓글: {item.content}</span>
          <span> {item.createdAt} </span>
        </div>))
      ) : (
          <h4>No Comments</h4>
        )}
    </div>
    <div>
      <button onClick={() => { history.push(`/${board}`) }}>{board}</button>
    </div>
  </>)
}

export default Content;
