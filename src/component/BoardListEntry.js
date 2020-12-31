import React from 'react';
import {
  Link,
} from "react-router-dom";
function BoardListEntry({content,link}) {
  return (
    <li>
      <p><Link to={`/${link}/${content.id}`}>{content.title}</Link></p>
      <p>{content.writer}</p>
      <p>{content.created_at}</p>
      <p>{content.comments.length}</p>
      <p>{content.likes.length}</p>
    </li>
  )
}
export default BoardListEntry