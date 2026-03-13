import React, { useState } from 'react'

const ReplyBox = ({postHandler}) => {
  const [replyText,setReplyText]=useState("");
  return (
    <div className='replyBox'>
       <textarea onChange={(e)=>setReplyText(e.target.value)} value={replyText} placeholder='write your reply' style={{padding:"5px" }} rows="3" cols="20"></textarea>
        <button onClick={()=>postHandler(replyText,setReplyText)} className='btn'>post</button>
    </div>
    
  )
}

export default ReplyBox