import { createContext, useState } from "react";
import data from "../data.js";

export const FileContext = createContext();

const FileExplorerProvider = ({ children }) => {
    
  const [nodes, setNodes] = useState(data.items);

  function add(pid=null) {
    
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

  return (
    <FileContext.Provider value={{ nodes, add,deleteNode }}>
      {children}
    </FileContext.Provider>
  );
};

export default FileExplorerProvider;