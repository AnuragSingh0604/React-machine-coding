import React, { useState } from 'react'
import ReplyBox from './ReplyBox'

const CommentBox = ({comment,allComments}) => {
  const [reply,setReply]=useState(false);
  function postHandler(replyText,setReplyText){
    setReplyText("");
    setReply(!reply);

  }
  return (
    <div className="container">
        <div className='commentContainer'>
            <p className='comment'>{comment.text}</p>
            <div onClick={()=>setReply(!reply)} className='btnContainer'><button className='btn'>{reply ?"cancel" : "reply"}</button>
            <button className='btn'>delete</button></div>
        </div>
        {reply && <ReplyBox postHandler={postHandler}></ReplyBox>
}
<div className="nestedComment">
  {
    comment.children.map(id => (
      <CommentBox
        key={id}
        comment={allComments[id]}
        allComments={allComments}
      />
    ))
  }
</div>
        
    </div>
  )
}

export default CommentBox