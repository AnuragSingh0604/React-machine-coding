import { useState } from 'react'
import React from 'react'
import { Comment } from './component/Comment'
import AllComment from './data'

const App = () => {
  const [allComments,setAllComments]=useState(AllComment.comments);
  const rootComments=Object.values(allComments).filter( comment => !comment.parentId )
  return (
    <div className='container'>{
      rootComments.map((item)=> <Comment comment={item} key={item.id } allComments={allComments}></Comment>)
      }
      
    </div>
  )
}

export default App