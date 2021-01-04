import React from 'react';
import { Link } from "react-router-dom";
function BoardListEntry({content,board}) {
  const timeFormater = (time = "") => {
    return time.replace(/-/g, ".").split("T")[0]
  }
  return (
    <div className="board-entry-wrapper">
      <div className="board-title">
        <Link to={`/${board}/${content.id}`}>{content.title}</Link>
      </div>
      <div className="board-entry-info">
        <span className="board-writer">{content.writer}</span>
        <span className="board-createdAt">{timeFormater(content.createdAt)}</span>
        <span className="board-comments">💬 {content.comments.length}</span>
        <span className="board-likes">👍 {content.likes.length}</span>
      </div>
    </div>
  )
}
export default BoardListEntry;