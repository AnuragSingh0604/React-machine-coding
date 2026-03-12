import React from 'react'
import ReplyBox from './ReplyBox'

const CommentBox = () => {
  return (
    <div className="container">
        <div className='commentContainer'>
            <p className='comment'>comment</p>
            <div className='btnContainer'><button className='btn'>reply</button>
            <button className='btn'>delete</button></div>
        </div>
        <ReplyBox></ReplyBox>

    </div>
  )
}

export default CommentBox