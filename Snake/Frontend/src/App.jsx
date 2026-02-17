
import { useState } from "react";
const App = ({ n = 10 }) => {
  const [box, setBox] = useState(() => 
    Array.from({ length: n }, () => new Array(n).fill(""))
  );

  return (
    <div className='container'>
      <div style={{ 
        display: "grid", 
       
        gridTemplateColumns: `repeat(${n}, 40px)` ,
        gridTemplateRows:`repeat(${n}, 40px)`
      }}>
        {box.map((row, yCor) =>
          row.map((column, xCor) => (
            <div 
              
              key={`${yCor}-${xCor}`} 
              style={{ 
                border: "1px solid black", 
               
                
              }}
            >
              
            </div>
          ))
        )}
      </div>
    </div>
  );
}



export default App;