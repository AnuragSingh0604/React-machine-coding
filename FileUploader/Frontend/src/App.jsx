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
  console.log(file);
  return (
    <div className='container'>
      <h1>File uploader</h1>
     <Subcontainer hanlder={inputHandler}></Subcontainer>
     {
      file.map((item,index)=> <Preview key={index} item={item} ></Preview>)
     }
     
    </div>
  )
}

export default App