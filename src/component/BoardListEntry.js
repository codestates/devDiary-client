import React from 'react';
import { Link } from "react-router-dom";
function BoardListEntry({content,board}) {
  const timeFormater = (time = "") => {
    return time.replace(/-/g, ".").split("T")[0]
  }
  return (
    <li>
      <p><Link to={`/${board}/${content.id}`}>{content.title}</Link></p>
      <p>{content.writer}</p>
      <p>{timeFormater(content.createdAt)}</p>
      <p>{content.comments.length}</p>
      <p>{content.likes.length}</p>
    </li>
  )
}
export default BoardListEntry