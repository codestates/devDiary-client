import React from 'react';
function BoardListEntry({content}) {
  return (
    <li>
      <p>{content.title}</p>
      <p>{content.writer}</p>
      <p>{content.created_at}</p>
      <p>{content.comments.length}</p>
      <p>{content.likes.length}</p>
    </li>
  )
}
export default BoardListEntry