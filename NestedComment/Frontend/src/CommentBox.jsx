import React, { useState } from 'react'
import ReplyBox from './ReplyBox'

const CommentBox = ({comment,allComments,addComment,deleteComment}) => {
  const [reply,setReply]=useState(false);
  function postHandler(replyText,setReplyText){
    addComment(replyText,comment.id);
    setReplyText("");
    setReply(false);

  }
  return (
    <div className="container">
        <div className='commentContainer'>
            <p className='comment'>{comment.text}</p>
            <div onClick={()=>setReply(!reply)} className='btnContainer'><button className='btn'>{reply ?"cancel" : "reply"}</button>
            <button onClick={()=>deleteComment(comment.id)} className='btn'>delete</button></div>
        </div>
        {reply && <ReplyBox addComment={addComment} postHandler={postHandler}></ReplyBox>
}
<div className="nestedComment">
  {
    comment.children?.map(id => (
      <CommentBox
        key={id}
        comment={allComments[id]}
        allComments={allComments}
        addComment={addComment}
        deleteComment={deleteComment}
      />
    ))
  }
</div>
        
    </div>
  )
}

export default CommentBox