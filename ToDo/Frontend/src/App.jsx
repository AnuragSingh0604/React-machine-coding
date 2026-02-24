import React, { useEffect, useState } from 'react'

const App = () => {
  const [task,setTask]=useState("");
  const [todo,setTodo]=useState(() => {
  try {
    return JSON.parse(localStorage.getItem("todo")) || [];
  } catch {
    return [];
  }
});
 
  function addTaskHandler(){
    if (!task.trim()) return;
    setTodo(prev=>{
      const newTodo=prev.map(item=>{return {...item}});
      newTodo.push({value:task,isCompleted:false,isDeleted:false,id:new Date().getTime()});
     
    
       return newTodo;
    })
      setTask("");
      return;
  }
  useEffect(()=>localStorage.setItem("todo",JSON.stringify(todo)),[todo]);
 
  function completeHandler(id){
  setTodo(prev =>
    prev.map(item =>
      item.id === id
        ? { ...item, isCompleted: !item.isCompleted }
        : item
    )
  );
}

function deleteHandler(id){
  setTodo(prev =>
    prev.map(item =>
      item.id === id
        ? { ...item, isDeleted: !item.isDeleted }
        : item
    )
  );
}
  console.log(todo);
  return (
    <div style={{display:"flex",flexDirection:"column",alignItems:"center",marginTop:"10px"}}>
      <div style={{display:"flex", gap:"10px"}}>
        <input value={task} onChange={(e)=>setTask(e.target.value)}></input>
        <button onClick={addTaskHandler}>Add Task</button>
      </div>
      <div style={{width:"200px"}}>
  {todo.map(item => (
    !item.isDeleted &&
    <div
      key={item.id}
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%"
      }}
    >
      {/* Left side task */}
    
       <span
  style={{
    fontSize: "15px",
    textDecoration: item.isCompleted? "line-through" : "none"
  }}
>
  {item.value}
</span>


      {/* Right side icons */}
      <div style={{ display: "flex", gap: "10px" }}>
        <span onClick={()=>completeHandler(item.id)} >&#10003;</span>
        <span onClick={()=>deleteHandler(item.id)}>&#10008;</span>
      </div>
    </div>
  ))}
</div>
    </div>
  )
}

export default App