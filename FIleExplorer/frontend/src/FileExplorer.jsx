import React,{useContext, useState} from 'react'
import { FileContext } from "./Context/FileExplorerContext.jsx";


const FileExplorer = ({id}) => {
    const fileContext =useContext(FileContext);
    const [showChildren,setShowChildren]=useState(false);
     const {nodes}=fileContext;

   
  return (
    <div className='container'>
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
  {
    showChildren && nodes[id]?.children?.map((item,index)=>{ return <FileExplorer key={item} id={item}></FileExplorer>})
  }

    </div>
  )
}

export default FileExplorer