import React,{useRef} from 'react'

const Column = ({item,setdata,dragRef}) => {
    

    function dragStartHandler(e,task,sourceColumn){

        e.target.style.opacity="0.5";
        dragRef.current[0]=task;
        dragRef.current[1]=sourceColumn;


    }
    function dropHandler(targetColumnId) {
  const task = dragRef.current[0];
  const sourceColumn = dragRef.current[1];

  if (!task || !sourceColumn) return;

  // Optional: prevent same column duplicate behavior
  if (sourceColumn === targetColumnId) return;

  setdata(prev => ({
    ...prev,
    columns: {
      ...prev.columns,

      [sourceColumn]: {
        ...prev.columns[sourceColumn],
        task: prev.columns[sourceColumn].task.filter(
          t => t !== task
        )
      },

      [targetColumnId]: {
        ...prev.columns[targetColumnId],
        task: [
          ...prev.columns[targetColumnId].task,
          task
        ]
      }
    }
  }));
}

    
  return (
    <div onDrop={()=>dropHandler(item.id)} onDragOver={(e)=>e.preventDefault()} className='column'>
        <span>{item.title}</span>
        {
            item.task.map((task,index)=><div  onDragStart={(e)=>dragStartHandler(e,task,item.id)} 
            onDragEnd={(e)=>e.target.style.opacity="1"} className="task"  draggable key={index}>{task}
            </div>)
        }
    </div>
  )
}

export default Column;