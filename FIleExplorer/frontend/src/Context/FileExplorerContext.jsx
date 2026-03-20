import { createContext, useState } from "react";
import data from "../data.js";

export const FileContext = createContext();

const FileExplorerProvider = ({ children }) => {
    
  const [nodes, setNodes] = useState(data.items);

  function editNode(value, id) {
  if (!value || !id) return;

  const type = value.includes(".") ? "file" : "folder";

  setNodes(prev => {
    if (!prev[id]) return prev;

    // ❌ Restrict: root cannot be file
    if (prev[id].parentId === null && type === "file") {
      
      return prev;
    }

    const updatedNodes = { ...prev };

    updatedNodes[id] = {
      ...updatedNodes[id],
      name: value,
      type,
      children:
        type === "folder"
          ? updatedNodes[id].children || []
          : []
    };

    return updatedNodes;
  });
}
  function deleteNode(id) {
  setNodes(prev => {
    const newNodes = { ...prev };

    const pid = newNodes[id]?.parentId;

    
    if (pid !== null && newNodes[pid]) {
      newNodes[pid] = {
        ...newNodes[pid],
        children: newNodes[pid].children?.filter(child => child !== id)
      };
    }

   
    function deleteChild(childId) {
      const node = newNodes[childId];

      node?.children?.forEach(child => deleteChild(child)); 

      delete newNodes[childId];
    }

    deleteChild(id);

    return newNodes;
  });
}
function addNode(value,parentId=null){
    if(!value){
      return;
    }
    const type = value.includes(".") ? "file" : "folder";
    const newNode={
      id:Date.now().toString(),
      name:value,
      type,
      parentId,
      children:[]
    }
    setNodes((prev)=>{
    const updatedNodes = {
  ...prev,
  [newNode.id]: newNode
};
      if(parentId){
      updatedNodes[parentId]={
        ...updatedNodes[parentId],
        children:[...updatedNodes[parentId].children,newNode.id]
      }
    }
    return updatedNodes;
    })

}

  return (
    <FileContext.Provider value={{ nodes, addNode,deleteNode,editNode }}>
      {children}
    </FileContext.Provider>
  );
};

export default FileExplorerProvider;