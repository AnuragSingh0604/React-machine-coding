import React from 'react'

const Column = ({ item, dragRef, setData }) => {

  function dragStartHandler(e, id, t) {
    e.target.style.opacity = 0.5;

    dragRef.current[0] = id;
    dragRef.current[1] = t;
  }

  function dropHandler(itemid) {
    if(itemid===dragRef.current[0]){
      return;
    }

   

    setData((p) => {

      let newData = {
        ...p,
        columns: {
          ...p.columns,
           [dragRef.current[0]]:{
            ...p.columns[dragRef.current[0]],
            task:p.columns[dragRef.current[0]].task.filter((t)=>t!==dragRef.current[1])
          },

          [itemid]: {
            ...p.columns[itemid],

            task: [
              ...p.columns[itemid].task,
              dragRef.current[1]
            ]
          }
          
         
        }
      };

      return newData;
    });
  }

  return (
    <div
      className='column'

      onDragOver={(e) => {
        e.preventDefault();
      }}

      onDrop={(e) => {
        e.preventDefault();
        dropHandler(item.id);
      }}
    >

      <span>{item.title}</span>

      {
        item.task.map((t, id) => (

          <p
            key={id}
            className='task'

            draggable={true}

            onDragStart={(e) => {
              dragStartHandler(e, item.id, t)
            }}

            onDragEnd={(e) => {
              e.target.style.opacity = 1
            }}
          >
            {t}
          </p>
        ))
      }

    </div>
  )
}

export default Column