import React, { useState } from 'react'
const cellValue={
  x:"X",
  o:"O",
}

const App = ({n=3}) => {
  const [cell, setCell] = useState(() =>
  Array.from({ length: n }, () => Array(n).fill(""))
);

const [status,setStatus]=useState(cellValue.x);
function clickHandler(row,column){
  if(cell[row][column] !==""){
    return;
  }
  
setCell(prev=>{
  const newGrid=prev.map((row,index)=>[...row]);

  newGrid[row][column]=status;
  return newGrid;
})
setStatus((prev)=>(prev===cellValue.x?cellValue.o:cellValue.x));


}
function resetHandler(){
  
}



  return (
    <div style={{height:"100vh",gap:"5px",display:"flex",justifyContent:"center",alignItems:"center",flexDirection:"column"}}>
      <div style={{
          display: "grid",
          justifyContent:"center",
          alignItems:"center",
          gridTemplateColumns: `repeat(${n}, 40px)`, 
          gap: "4px",
        }}>
        {
          cell.map((row,i)=>(row.map((rowitem,j)=><div style={{width:"40px",height:"40px",cursor: "pointer",border:"1px solid black",borderRadius:"3px" ,display:"flex",justifyContent:"center",alignItems:'center'}} onClick={()=>clickHandler(i,j)} key={i + "-" + j}
>{rowitem}</div>)))
        }
      </div>
      <div style={{textAlign:"center",fontSize:"20px"}}>{`turn: ${status}`}</div>
      <button style={{padding:"5px",borderRadius:"3px", fontSize:"16px"}}>Reset</button>
    </div>
  )
}

export default App