import React, { useState } from 'react'
import Subcontainer from "./components/SubContainer.jsx"
import Preview from "./components/Preview.jsx";

const App = () => {
  const [file,setFiles]=useState([]);
  function inputHandler(e){
   let data=Array.from(e.target.files);
  if(data && data.length>0){
    setFiles(prev => [...prev, ...data]);
  }


  }
  function deleteHandler(item){
    if(!item)
      return;
    setFiles((prev)=>{
      const newdata=prev.filter((data,index)=>data.name!==item.name);
      return newdata;

    })

  }
  function draghandler(e){
   
    let data=Array.from(e.dataTransfer.files);
  if(data && data.length>0){
    setFiles(prev => [...prev, ...data]);
  }
  }
 
  return (
    <div className='container'>
      <h1>File uploader</h1>
     <Subcontainer dragHandler={ draghandler}hanlder={inputHandler}></Subcontainer>
     <div className='previewContainer'>
     {
      file.map((item,index)=> <Preview Delete={deleteHandler} key={index} item={item} ></Preview>)
     }
     </div>
     
    </div>
  )
}

export default App