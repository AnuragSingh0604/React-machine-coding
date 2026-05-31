import React, { useEffect, useState } from "react";
import Cell from "./components/Cell";

const getRandomPosition = (size) => {
  return {
    row: Math.floor(Math.random() * size),
    col: Math.floor(Math.random() * size),
  };
};

const App = ({ size = 3 }) => {
  const [molePos, setMolePos] = useState(
    getRandomPosition(size)
  );
 const [score,setScore]=useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setMolePos(prev => {
  let next;

  do {
    next = getRandomPosition(size);
  } while (
    next.row === prev.row &&
    next.col === prev.col
  );

  return next;
});
    }, 1000);

    return () => clearInterval(timer);
  }, [size]);

  return (
    <>
    <div
      className="grid"
      style={{
        gridTemplateColumns: `repeat(${size}, 100px)`,
      }}
    >
      {Array.from({ length: size }).map((_, i) =>
        Array.from({ length: size }).map((_, j) => (
          <Cell
            key={`${i}-${j}`}
            isMole={
              molePos.row === i &&
              molePos.col === j
            }
            Score={setScore}
          />
        ))
      )}
    </div>
    <h1>score: {score}</h1>
    </>
  );
};

export default App;