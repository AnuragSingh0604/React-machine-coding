import React,{useState,useContext} from 'react'
import dataContext from '../Context/dataContext';

const File = ({item}) => {
   const {data,editData,deleteData}=useContext(dataContext);
       const [isEditing,setIsEditing]=useState(false);
           const [editInputValue,setEditInputValue]=useState(item.name);
       
   
  function editHandler(){
      let input=editInputValue.trim();
      if(!input || input===item.name){
            return;
        }
        const isFile = input.includes(".");
const type = isFile ? "file" : "folder";
       editData(input,type,item.id);
       setEditInputValue("");
      
       setIsEditing(false);
       return;



    }
  
    
        
          return (
            <>
            <div className="file" >
              <span>
                <img
                  src='/file.png'
                  alt="file"
                />
              </span>
              <span>{item.name}</span>
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
            {
                               isEditing && <div className='input'><input  value={editInputValue} onChange={(e)=>setEditInputValue(e.target.value)}></input> <button onClick={editHandler}>submit</button></div>

            }

            
            </>
          );

  
}

export default File