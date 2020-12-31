import React, { useEffect, useState } from 'react';
import BoardListEntry from './BoardListEntry'
import {Link} from "react-router-dom";
import './css/BoardList.css'
import axios from 'axios';

function BoardList({ link,isLogin }) {
  const [contents, setContents] = useState([]);
  useEffect(() => {
    axios.get(`http://localhost:4000/${link}`)
    .then(param=>{
      setContents(param.data.list)
    })
    .catch(()=>{
      console.log('오류오류')
    })
  },[]);
  const contentsList = contents.map((ele)=>{
    return <BoardListEntry key={ele.id} content={ele} link={link} />
  })
  return (
    <div>
      <div className='list'>
        <ul>
         {contentsList}
        </ul>
      </div>
        {isLogin && <button><Link to={`/${link}/newPost`}>글쓰기</Link></button>}
    </div>
  )
}
export default BoardList