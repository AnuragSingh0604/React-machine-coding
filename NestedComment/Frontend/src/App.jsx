import React, { useState } from 'react'
import CommentBox from './CommentBox'
import commentsData from './data'

const App = () => {
  const [allComments, setAllComments] = useState(commentsData.comments);

  const rootComments = Object.values(allComments).filter(
    comment => !comment.parentId 
  );
function addComment(value,pId){
  const newId = Date.now().toString();
  const newComment={id:newId,parentId: pId||null,
      author: "you",
      text: value,
      children: []}
  setAllComments(prev=>{
    let updatedComment={...prev,[newId]:newComment};
    if (pId) {
      updatedComment[pId] = {
        ...updatedComment[pId],
        children: [...updatedComment[pId].children, newId]
      };
    }

    return updatedComment;
    

  })
}
function deleteComment(id) {
  if(!id){
    return;
  }
  setAllComments(prev => {
    const updated = { ...prev };
     if (!updated[id]) return prev;

    function removeRecursively(commentId) {
      const comment = updated[commentId];

     
      comment.children.forEach(childId => {
        removeRecursively(childId);
      });

      delete updated[commentId];
    }

    const parentId = updated[id].parentId;

   
    if (parentId) {
      updated[parentId] = {
        ...updated[parentId],
        children: updated[parentId].children.filter(c => c !== id)
      };
    }

   
    removeRecursively(id);

    return updated;
  });
}

  return (
    <div>
      {rootComments.map(comment => (
        <CommentBox
          key={comment.id}
          comment={comment}
          allComments={allComments}
          addComment={addComment}
          deleteComment={deleteComment}
        />
      ))}
    </div>
  );
};

export default App;