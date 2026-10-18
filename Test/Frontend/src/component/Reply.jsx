import { useState } from "react"
import React from 'react'

const Reply = ({deleteComment,comment,addComment}) => {
    const [isActive,setIsActive]=useState(false);
    const [reply,setReply]=useState("");

  return (
    <div className='btnCon'>
        <button onClick={()=>setIsActive(p=>!p)}>Reply</button>
        {
            isActive && <textarea
  value={reply}
  onChange={(e) => setReply(e.target.value)}
  onKeyDown={(e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();

      if (!reply.trim()) return;

      addComment(reply);
      setReply("");
      setIsActive(false);
    }
  }}
  className="replyBox"
/>
        }
        <button onClick={()=>deleteComment(comment.id)} >Delete</button>
    </div>
  )
}

export default Reply