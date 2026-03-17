import React,{useContext} from 'react'

import FileExplorer from './FileExplorer.jsx'
import {FileContext} from "./Context/FileExplorerContext.jsx"


const App = () => {
  const fileContext=useContext(FileContext);
  const {nodes}=fileContext;
  const rootFolder=Object.values(nodes).filter((item)=>item. parentId===null);

  return (
   
     rootFolder.map((item)=><FileExplorer key={item.id} id={item.id}></FileExplorer>)
   
    
    
  )
}

export default App