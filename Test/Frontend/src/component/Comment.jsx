import React from 'react'
import Reply from './Reply'

export const Comment = ({comment,allComments,setAllComments}) => {
    const child= Object.values(allComments).filter((item)=>comment.children.includes(item.id))
   function deleteComment(id) {
    setAllComments((prev) => {
      const idsToDelete = new Set();

      // Collect this comment and all its descendants
      function collectChildren(currentId) {
        const current = prev[currentId];

        if (!current || idsToDelete.has(currentId)) return;

        idsToDelete.add(currentId);

        current.children.forEach(collectChildren);
      }

      collectChildren(id);

      // Create a new comments object without deleted comments
    const updatedComments = {};

for (const id in prev) {
  updatedComments[id] = {
    ...prev[id],
    children: [...prev[id].children]
  };
}
      idsToDelete.forEach((deletedId) => {
        delete updatedComments[deletedId];
      });

      // Remove this comment from its parent's children array
      if (comment.parentId !== null) {
        const parent = updatedComments[comment.parentId];

        if (parent) {
          updatedComments[parent.id] = {
            ...parent,
            children: parent.children.filter(
              (childId) => childId !== id
            ),
          };
        }
      }

      return updatedComments;
    });
  }
 function addComment(data) {
    setAllComments(prev => {
        const updatedComments = {};

        for (const id in prev) {
            updatedComments[id] = {
                ...prev[id],
                children: [...prev[id].children]
            };
        }

        const newId = String(Object.keys(prev).length + 1);

        updatedComments[newId] = {
            id: newId,
            parentId: comment.id,
            author: "Priya",
            text: data,
            children: []
        };

        updatedComments[comment.id].children.push(newId);

        return updatedComments;
    });
} 

  return (
    <>
    <div className='comment'>
        <span>{comment.text}</span>
       
            <Reply addComment={addComment} deleteComment={deleteComment} comment={comment}></Reply>
            
        
    </div>
    {
        child.map(item=><Comment  setAllComments={setAllComments} comment={item} key={item.id} allComments={allComments}></Comment>)
    }
    </>
  )
}
