import React, { useState,useContext } from 'react';
import dataContext from '../Context/dataContext';
import File from './File';

const Folder = ({item}) => {
  const [isOpened, setIsOpened] = useState(false);
    const {data,addData,editData,deleteData}=useContext(dataContext);
    const [isAdding,setIsAdding]=useState(false);
    const [isEditing,setIsEditing]=useState(false);
    const [inputValue,setInputValue]=useState("");
    const [editInputValue,setEditInputValue]=useState(item.name);
    function addHandler(){
        let input=inputValue.trim();
        if(!input){
            return;
        }
        const isFile = input.includes(".");
const type = isFile ? "file" : "folder";
       addData(input,type,item.id);
       setInputValue("");
       setIsOpened(true);
       setIsAdding(false);
       return;


    }
    function editHandler(){
      let input=editInputValue.trim();
      if(!input || input===item.name){
            return;
        }
        const isFile = input.includes(".");
const type = isFile ? "file" : "folder";
       editData(input,type,item.id);
       setEditInputValue("");
       setIsOpened(true);
       setIsEditing(false);
       return;



    }
    


  return (
    <>
    <div className="folder" >
      <span>
        <img
        onClick={() => setIsOpened(prev => !prev)}
          src={isOpened ? "/open_folder.png" : "/closed_folder.png"}
          alt="Folder"
        />
      </span>
      <span>{item.name}</span>
      <div className='btn'>
        <button onClick={()=>setIsAdding(!isAdding)}>add</button>
        
<button
  onClick={() => {
    if (!isEditing) {
      setEditInputValue(item.name);
    }
    setIsEditing(prev => !prev);
  }}
>
  edit
</button>           <button onClick={()=>deleteData(item.id)}>delete</button>
      </div>

    </div>
    {
       isOpened && item.children.map((child) => {
  const childItem = data[child];

  if (!childItem) return null;

  return childItem.type === "folder"
    ? <Folder key={childItem.id} item={childItem} />
    : <File key={childItem.id} item={childItem} />;
})
    }
    {
        isAdding && <div className='input'><input  value={inputValue} onChange={(e)=>setInputValue(e.target.value)}></input> <button onClick={addHandler}>submit</button></div>
    }
    {
        isEditing && <div className='input'><input  value={editInputValue} onChange={(e)=>setEditInputValue(e.target.value)}></input> <button onClick={editHandler}>submit</button></div>
    }
    </>
  );
};

export default Folder;