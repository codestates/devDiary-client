import React, { useEffect, useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import Search from "./Search"

axios.defaults.withCredentials = true;

const Content = function ({ isLogin, username }) {
  const history = useHistory();
  const id = window.location.href.split("/")[4];
  const board = window.location.href.split("/")[3];
  let values = {
    newComment: "",
  };
  let commentMessage = "";
  const [ contentData, setContentData ] = useState({ data: {} });
  useEffect(() => {
    axios.get(`http://localhost:4000/${board}/${id}`)
    .then((param) => {
      setContentData(param.data);
    })
  },[])
  const { title, content, likes, comments, createdAt, writer, tags } = contentData.data;
  const { hadLiked } = contentData;

  const handleInputValue = (key) => (e) => {
    values[key] = e.target.value;
  }

  const timeFormater = (time = "") => {
    return time.replace(/-/g, ".").split("T")[0]
  }

  const handleUpdate = function () {
    history.push(`/${board}/updatePost/${id}`);
  }
  const handleDelete = function () {
    axios.post(`http://localhost:4000/${board}/deletePost/${id}`)
      .then(() => {
        history.push(`/${board}`);
      })
  }
  const handleLikes = function () {
    axios.post(`http://localhost:4000/${board}/${id}/like/`)
      .then(() => {
        axios.get(`http://localhost:4000/${board}/${id}`)
          .then((param) => {
            setContentData(param.data);
          })
      })
      .catch((err) => console.log(err));
  }
  const handleNewComment = function () {
    if(values.newComment){
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
  return (<>
    <Search></Search>
    <div>제목: {title}</div>
    <div>
      <span>{writer}</span>
      <span>{timeFormater(createdAt)}</span>
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
        ? <button onClick={handleLikes}>따봉 {likes ? likes.length : 0}</button>
        : <span>따봉 {likes ? likes.length : 0}</span>
      }
      {isLogin && hadLiked === "true"
        ? <span>한 번 더 좋아요를 누르면 좋아요를 취소 할 수 있습니다</span>
        : <span />
      }
    </div>
    <div>
      tags: {tags}
    </div>
    {isLogin
      ? (
        <div>댓글작성:
          <input type="text" id="comment" className="newComment" onChange={handleInputValue("newComment")} />
          <button onClick={handleNewComment}>등록</button>
          <div>{commentMessage}</div>
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
          <span> {timeFormater(item.createdAt)} </span>
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
