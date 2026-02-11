import React, { useState ,useRef, useEffect} from 'react';

const App = ({ n = 3 }) => {
  
  const [grid, setGrid] = useState(() =>
    Array.from({ length: n }, () => Array(n).fill(false))
  );
const clickRef = useRef([]);
const indexRef = useRef(0);
const intervalIdRef=useRef(null);





 function clickHandler(i, j) {
  if (indexRef.current > 0) return;

  setGrid(prev => {
    const newGrid = prev.map(row => [...row]);
    newGrid[i][j] = true;
    return newGrid;
  });

  const alreadyClicked = clickRef.current.some(
    pos => pos.i === i && pos.j === j
  );

  if (!alreadyClicked) {
    clickRef.current.push({ i, j });
  }
}

 function reverseColoring() {

  const list = clickRef.current;

  

  const { i, j } = list[indexRef.current];

  setGrid(prev => {
    const newGrid = prev.map(row => [...row]);
    newGrid[i][j] = false;
    return newGrid;
  });

  indexRef.current += 1;
}

 useEffect(() => {
  const isAllTrue=grid.every((row)=>(row.every((item)=>item)));
  
 if (isAllTrue || indexRef.current > 0){
 

     intervalIdRef.current= setTimeout(() => {
      if (indexRef.current >= clickRef.current.length) {
    clickRef.current = [];
    indexRef.current = 0;
    clearTimeout(intervalIdRef.current);
    return;
  }
      
      reverseColoring();
    }, 1000);

  
    
  
  }
}, [grid]);
useEffect(()=>{





  return ()=>clearTimeout(intervalIdRef.current);
}

  
  ,[]);


  return (
  
    <div
      style={{ 
    display: "flex", 
    justifyContent: "center", 
    width: "100vw" 
  }}
    >
      <div
        className="grid-container"
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${n}, 40px)`, 
          gap: "4px",
        }}
      >
        {grid.map((row, rowIndex) =>
          row.map((item, colIndex) => (
            <div
              key={`${rowIndex}-${colIndex}`}
              onClick={()=>clickHandler(rowIndex,colIndex)}
              
              style={{
                width: "40px",
                height: "40px",
                backgroundColor: item ? "orange" : "#f0f0f0",
                border: "1px solid #ccc",
                cursor: "pointer" 
              }}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default App;