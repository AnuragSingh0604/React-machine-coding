
import { useEffect, useState,useRef } from "react";
function generateFood(){
  const x=Math.floor(Math.random() * 10);
  const y=Math.floor(Math.random() *10);
  return {row:x,col:y};
}
const App = ({ n = 10 }) => {
  const [box, setBox] = useState(() => 
    Array.from({ length: n }, () => new Array(n).fill(""))
  );
  const[isGameOver,setIsGameOver]=useState(false);
  const foodRef=useRef(generateFood());
  
  const [snake, setSnake] = useState(() => [
  { row: 5, col: 5},
  { row: 4, col: 5 },
  { row: 3, col: 5 }
]);
const directionRef=useRef([1,0]);
const isSnake=(x,y)=>snake.some(({row,col})=> x===row && y===col);
useEffect(() => {
  if (isGameOver) return;

  const timer = setTimeout(() => {
    setSnake(prev => {
      const head = prev[0];
      const newHead = { row: head.row + directionRef.current[0], col: head.col+directionRef.current[1] };
      

      
      if (newHead.row >= n || newHead.row < 0 || newHead.col >= n|| newHead.col < 0) {
        setIsGameOver(true);
        return prev; 
      }

      // 2. Check Self Collision
      const isBitSelf = prev.some(segment => segment.row === newHead.row && segment.col === newHead.col);
      if (isBitSelf) {
        setIsGameOver(true);
        return prev;
      }
       const isEating = newHead.row === foodRef.current.row && newHead.col === foodRef.current.col;

  if (isEating) {
    // Generate new food immediately
    foodRef.current = generateFood();
    // Return head + the ENTIRE previous body (This is the growth)
    return [newHead, ...prev];
  }

  // 3. Standard move: Return head + all segments except the last one
  const newBody = [...prev];
  newBody.pop(); // Remove tail
  return [newHead, ...newBody];
    });
  }, 300);
  console.log(snake.length);
  const handleKeyPress = (e) => {
    
  switch (true) {
    case (e.key === "ArrowUp" && directionRef.current[1] !== 1):
      directionRef.current = [0, -1];
      break;
    case (e.key === "ArrowDown" && directionRef.current[1] !== -1):
      directionRef.current = [0, 1];
      break;
    case (e.key === "ArrowLeft" && directionRef.current[0] !== 1):
      directionRef.current = [-1, 0];
      break;
    case (e.key === "ArrowRight" && directionRef.current[0] !== -1):
      directionRef.current = [1, 0];
      break;
  }
  };

  window.addEventListener('keydown', handleKeyPress);

  return () => {
    window.removeEventListener('keydown', handleKeyPress);
    clearTimeout(timer);
    return;

  }
}, [snake, isGameOver]);



  return (
    <div className='container'>
      <div style={{ 
        display: "grid", 
       border:"2px solid black",
        gridTemplateColumns: `repeat(${n}, 30px)` ,
        gridTemplateRows:`repeat(${n}, 30px)`
      }}>
        {box.map((row, yCor) =>
          row.map((column, xCor) => (
            <div 
              className={`${isSnake(xCor,yCor)?"snake":""} ${(foodRef.current.row===xCor && foodRef.current.col===yCor )?"food":""}`}
              key={`${yCor}-${xCor}`} 
              
            >
              
            </div>
          ))
        )}
      </div>
    </div>
  );
}



export default App;