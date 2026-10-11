import React from 'react'
import Reply from './Reply'

export const Comment = ({comment,allComments}) => {
    const child= Object.values(allComments).filter((item)=>comment.children.includes(item.id))
    console.log(child);

  return (
    <>
    <div className='comment'>
        <span>{comment.text}</span>
       
            <Reply></Reply>
            
        
    </div>
    {
        child.map(item=><Comment comment={item} key={item.id} allComments={allComments}></Comment>)
    }
    </>
  )
}
