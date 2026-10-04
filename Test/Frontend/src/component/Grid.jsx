import React, { useState, useRef, useEffect } from 'react';

function generateFood(size) {
  return {
    row: Math.floor(Math.random() * size),
    col: Math.floor(Math.random() * size),
  };
}

const Grid = ({ size = 15 }) => {
  const [snake, setSnake] = useState([
    { row: 5, col: 5 },
    { row: 6, col: 5 },
    { row: 7, col: 5 },
  ]);
  const [isGameOver, setIsGameOver] = useState(false);

  const foodRef = useRef(generateFood(size));
  const directionRef = useRef([-1, 0]);

  const isSnake = (r, c) => snake.some(({ row, col }) => r === row && c === col);

  // Keyboard handler in a dedicated effect
  useEffect(() => {
    function handlePress(e) {
      const [dr, dc] = directionRef.current;
      switch (e.key) {
        case 'ArrowUp':
          if (dr !== 1) directionRef.current = [-1, 0];
          break;
        case 'ArrowDown':
          if (dr !== -1) directionRef.current = [1, 0];
          break;
        case 'ArrowLeft':
          if (dc !== 1) directionRef.current = [0, -1];
          break;
        case 'ArrowRight':
          if (dc !== -1) directionRef.current = [0, 1];
          break;
        default:
          break;
      }
    }

    window.addEventListener('keydown', handlePress);
    return () => window.removeEventListener('keydown', handlePress);
  }, []);

  // Game loop timer
  useEffect(() => {
    if (isGameOver) return;

    const timer = setTimeout(() => {
      setSnake((prev) => {
        const newHead = {
          row: prev[0].row + directionRef.current[0],
          col: prev[0].col + directionRef.current[1],
        };

        // 1. Wall Collision
        if (
          newHead.row < 0 ||
          newHead.row >= size ||
          newHead.col < 0 ||
          newHead.col >= size
        ) {
          setIsGameOver(true);
          return prev;
        }

        // 2. Self Collision
        if (prev.some((seg) => seg.row === newHead.row && seg.col === newHead.col)) {
          setIsGameOver(true);
          return prev;
        }

        // 3. Eating Food: prepend head and keep the tail (grows by 1)
        const isEating =
          newHead.row === foodRef.current.row &&
          newHead.col === foodRef.current.col;

        if (isEating) {
          foodRef.current = generateFood(size);
          return [newHead, ...prev];
        }

        // Regular move: prepend head and drop tail
        return [newHead, ...prev.slice(0, -1)];
      });
    }, 200); // 200ms feels much better than 1000ms

    return () => clearTimeout(timer);
  }, [snake, isGameOver, size]);

  return (
    <div
      className="Grid"
      style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${size}, 20px)`,
      }}
    >
      {Array.from({ length: size }).map((_, row) =>
        Array.from({ length: size }).map((_, col) => {
          const snakeCell = isSnake(row, col);
          const foodCell =
            foodRef.current.row === row && foodRef.current.col === col;

          return (
            <div
              key={`${row}-${col}`}
              className={`cell ${snakeCell ? 'snake' : ''} ${foodCell ? 'food' : ''}`}
              style={{
                width: 20,
                height: 20,
                border: '1px solid #ddd',
                backgroundColor: snakeCell ? 'green' : foodCell ? 'red' : 'white',
              }}
            />
          );
        })
      )}
    </div>
  );
};

export default Grid;