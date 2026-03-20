import React,{useContext, useState,useEffect} from 'react'
import { FileContext } from "./Context/FileExplorerContext.jsx";


const FileExplorer = ({id}) => {
    const fileContext =useContext(FileContext);
    const [showChildren,setShowChildren]=useState(false);
    const [showBox,setShowBox]=useState(false);
     const {nodes,addNode,deleteNode,editNode}=fileContext;
     const [value, setValue] = useState("");


     const [flag,setFlag]=useState(false);
     function handler(action, ...args) {
  if (!value.trim()) return;

  
  if (
    action === editNode &&
    nodes[id]?.parentId === null &&
    value.includes(".")
  ) {
    alert("Root level items must be folders");
    return;
  }

  action(...args);

  setValue("");
  setShowBox(false);
  setFlag(false);
}

   
  return (
    <div className="container">
  <div className="subContainer">
    
    <h5
      className="fileItem"
      onClick={() => setShowChildren(prev => !prev)}
    >
      {nodes[id].type === "folder" ? (
        <img
          className="fileIcon"
          src={showChildren ? "/open_folder.png" : "/closed_folder.png"}
          alt="folder"
        />
      ) : (
        <img
          className="fileIcon"
          src="/file.png"
          alt="file"
        />
      )}

      <span className="fileName">{nodes[id].name}</span>
    </h5>

    {/* Action Icons */}
    <div className="actionIcons">
      { nodes[id].type==="folder" && <img
        src="/add.png"
        alt="add"
        className="iconBtn"
        onClick={(e) => {
          e.stopPropagation();
          setShowBox(!showBox);
          setFlag(true);
          setValue("");
        }}
      />}

      <img
        src="/delete.png"
        alt="delete"
        className="iconBtn"
        onClick={(e) => {
          e.stopPropagation();
          deleteNode(id);
        }}
      />

      <img
        src="/edit.png"
        alt="edit"
        className="iconBtn"
        onClick={(e) => {
          e.stopPropagation();
          setShowBox(!showBox);
          setFlag(false);
          setValue(nodes[id]?.name||"")
          // 👉 call editNode(id)
        }}
      />
   
    </div>
     {showBox && <div><input  onChange={(e)=>setValue(e.target.value)}   value={value}type='text'></input> <button onClick={()=>{flag?handler(addNode,value,id):handler(editNode,value,id)}}>&#10003;</button><button onClick={()=>{setValue("");setShowBox(false);setFlag(false)}}>&#10060;</button></div>}

  </div>

  {/* Children */}
  {showChildren &&
    nodes[id]?.children?.map(childId => (
      <FileExplorer key={childId} id={childId} />
    ))
  }
</div>
  )
}

export default FileExplorer