import React,{useState,useRef} from 'react';



const Grid = ({size}) => {
  const nextRef=useRef("O");
  const [cell,setCell]=useState(()=>Array.from({length:size},(item)=>new Array(size).fill("")));
  console.log(cell);
  function clickHandler(r,c){
    if(cell[r][c]!==""){
      return;
    }
    const newCell=cell.map((item,row)=>item.map((colItem,col)=>row===r && col===c ? nextRef.current:colItem ));
                  nextRef.current= nextRef.current==="O"?"X":"O";


    setCell(
      newCell
    )

  }
  function isGameOver(){
    
  }
  function resetHandler(){
    nextRef.current="O";
    setCell(()=>Array.from({length:size},(item)=>new Array(size).fill("")));
  }
  return (
    <>
    <div className='Grid'>
      {
        cell.map((rowItem,r)=>rowItem.map((colItem,c)=><div onClick={()=>clickHandler(r,c)} className='cell' key={`${r}`+`${c}`}>{colItem}</div>))
      }

    </div>
        <p style={{"marginTop":"10px"}}>next move:{nextRef.current}</p>
        <button onClick={resetHandler}>Reset</button>
        </>
  )
}

export default Grid