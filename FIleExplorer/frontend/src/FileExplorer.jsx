import React,{useContext, useState} from 'react'
import { FileContext } from "./Context/FileExplorerContext.jsx";


const FileExplorer = ({id}) => {
    const fileContext =useContext(FileContext);
    const [showChildren,setShowChildren]=useState(false);
    const [showBox,setShowBox]=useState(false);
     const {nodes,addNode,deleteNode}=fileContext;
     const [value,setValue]=useState("");

   
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
          // 👉 call editNode(id)
        }}
      />
   
    </div>
     {showBox && <div><input onChange={(e)=>setValue(e.target.value)}   value={value}type='text'></input> <button onClick={()=>{if(value)addNode(value,id);setValue("");setShowBox(false)}}>&#10003;</button><button onClick={()=>{setValue("");setShowBox(false)}}>&#10060;</button></div>}

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