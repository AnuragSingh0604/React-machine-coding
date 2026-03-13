import React, { useState } from 'react'
import CommentBox from './CommentBox'
import commentsData from './data'

const App = () => {
  const [allComments, setAllComments] = useState(commentsData.comments);

  const rootComments = Object.values(allComments).filter(
    comment => comment.parentId === null
  );
  console.log(rootComments);

  return (
    <div>
      {rootComments.map(comment => (
        <CommentBox
          key={comment.id}
          comment={comment}
          allComments={allComments}
        />
      ))}
    </div>
  );
};

export default App;