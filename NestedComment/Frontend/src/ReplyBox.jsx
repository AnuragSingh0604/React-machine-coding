import React from 'react'

const ReplyBox = () => {
  return (
    <div className='replyBox'>
       <textarea placeholder='write your reply' style={{padding:"5px" }} rows="3" cols="20"></textarea>
        <button className='btn'>post</button>
    </div>
    
  )
}

export default ReplyBox