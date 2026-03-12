import React from 'react'
import { useState ,useRef,useEffect} from 'react';
const n = 6;

function generateGrid() {
  
  const numbers = Array.from({ length: (n * n) / 2 }, (_, i) => i + 1);

  
  const pairs = [...numbers, ...numbers];

  
  pairs.sort(() => Math.random() - 0.5);

 
   const grid = [];
for (let i = 0; i < n; i++) {
  grid.push(pairs.slice(i * n, i * n + n));
}
  

  return grid;
}

const App = () => {
  const [cell, setCell]=useState(()=>{let grid=generateGrid()
    return grid.map((item,raw)=>(item.map((i,column)=>({id:`${raw}${column}`,number:i,isFlipped:false}))))
  });
  const [pair,setPair]=useState(()=>[]);
  const ref=useRef(null);
  function clickHandler(row,column){
    if(cell[row][column].isFlipped) return;
    if(ref.current)
    {
      return;
    }
    const clickedcard=cell[row][column];
    
  setCell((prev)=>{
     const newGrid = prev.map((rowItem)=>
      rowItem.map((columnItem)=>
        columnItem.id === `${row}${column}`
          ? {...columnItem, isFlipped:!columnItem.isFlipped}
          : columnItem
      )
    );
    
    return newGrid;
  });
  setPair(prev => {
  if (prev.length >= 2) return prev;
  return [...prev, clickedcard];
});
 
 
}
useEffect(()=>{
  if(pair.length===2)
  {
    if(pair[0].number!==pair[1].number){
     ref.current= setTimeout(()=>{setCell((prev)=>{
    const newGrid = prev.map((rowItem,i)=>
      rowItem.map((columnItem,j)=>
        columnItem.id === pair[0].id || columnItem.id === pair[1].id
          ? {...columnItem, isFlipped:!columnItem.isFlipped}
          : columnItem
      )
    );
   
    return newGrid;
  });ref.current=null;},3000)
      
      
    }
    setPair([]);
   
  
  }

 return;

},
[pair]);
useEffect(()=>{return () => {clearTimeout(ref.current);
  ref.current=null;
}},[]);

 
  return (
    <div style={{display:'flex',justifyContent:"center",alignItems:"center"}}>
    <div
  style={{
    display: "grid",
    gridTemplateColumns: "repeat(6, 40px)",
    gap: "10px"
  }}
>{
  cell.map((item,row)=>(item.map((i,column)=><div onClick={()=>(clickHandler(row,column))} key={`${row}${column}`} style={{border:"1px solid black" ,display:'flex',justifyContent:"center", alignItems:"center",height:"40px"}}>{i.isFlipped?i.number:"?"}</div>)))
}

      </div>
      

    </div>
  )
  
 
}

export default App