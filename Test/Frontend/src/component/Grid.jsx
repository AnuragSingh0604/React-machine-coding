import React,{useState,useRef} from 'react';
import { useEffect } from 'react';



const Grid = ({size}) => {
  const nextRef=useRef("O");
  const [cell,setCell]=useState(()=>Array.from({length:size},(item)=>new Array(size).fill("")));
  const [isOver,setOver]=useState(false);
  function clickHandler(r,c){
    if(cell[r][c]!=="" ||isOver){
      return;
    }
    const newCell=cell.map((item,row)=>item.map((colItem,col)=>row===r && col===c ? nextRef.current:colItem ));
     if(checkWinner(newCell,r,c)||newCell.every((row)=>row.every((e)=>e!==""))){
      setOver(true);


     }
     else{
      nextRef.current= nextRef.current==="O"?"X":"O";
      

     }
                  


    setCell(
      newCell
    )

  }
  function checkWinner(grid, i, j) {
    const rowMatch = grid[i].every((item) => item === nextRef.current
  );
    const columnMatch = grid.every((row) => row[j] === nextRef.current
  );

    let diagonalMatch = false;
    let antiDiagonalMatch = false;

    if (i === j) {
      diagonalMatch = grid.every(
        (row, index) => row[index] === nextRef.current

      );
    }

    if (i + j === grid.length - 1) {
      antiDiagonalMatch = grid.every(
        (row, index) =>
          row[grid.length - 1 - index] === nextRef.current

      );
    }

    return (
      rowMatch ||
      columnMatch ||
      diagonalMatch ||
      antiDiagonalMatch
    );
  
   



  }
  function resetHandler() {
  nextRef.current = "O";

  setCell(
    Array.from(
      { length: size },
      () => new Array(size).fill("")
    )
  );

  setOver(false);
}
 useEffect(() => {
  if (!isOver) return;

  const timer = setTimeout(() => {
    resetHandler();
  }, 2000);

  return () => clearTimeout(timer);
}, [isOver]);
  return (
    <>
    <div className='Grid'>
      {
        cell.map((rowItem,r)=>rowItem.map((colItem,c)=><div onClick={()=>clickHandler(r,c)} className='cell' key={`${r}`+`${c}`}>{colItem}</div>))
      }

    </div>
        <p style={{"marginTop":"10px"}}>next move:{nextRef.current}</p>
        <button onClick={resetHandler}>Reset</button>
        {
          isOver && <h1>Game is over</h1>
        }
        </>
  )
}

export default Grid