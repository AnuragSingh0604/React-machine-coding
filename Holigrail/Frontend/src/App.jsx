import React, { useState } from 'react';

const App = ({ n = 3 }) => {
  
  const [grid, setGrid] = useState(() =>
    Array.from({ length: n }, () => Array(n).fill(false))
  );

 function clickHandler(e,i,j){
  setGrid((prev)=>{
      const newGrid=prev.map((row)=>[...row]);

      

  })

 }

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
          row.map((_, colIndex) => (
            <div
              key={`${rowIndex}-${colIndex}`}
              onClick={(e)=>clickHandler(e,rowIndex,colIndex)}
              
              style={{
                width: "40px",
                height: "40px",
                backgroundColor: isActive ? "orange" : "#f0f0f0",
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