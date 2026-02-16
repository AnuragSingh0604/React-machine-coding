import React, { useState } from "react";

const cellValue = {
  x: "X",
  o: "O",
};

const App = ({ n = 3 }) => {
  const [cell, setCell] = useState(() =>
    Array.from({ length: n }, () => Array(n).fill(""))
  );

  const [status, setStatus] = useState(cellValue.x);
  const [isOver, setOver] = useState(false);
  const [winner, setWinner] = useState(null);
  const [moves, setMoves] = useState(0);

  function clickHandler(row, column) {
    if (cell[row][column] !== "" || isOver) return;

    const player = status;

    const newGrid = cell.map((r, i) =>
      r.map((val, j) => (i === row && j === column ? player : val))
    );

    const hasWon = checkWinner(newGrid, row, column, player);
    const isDraw = !hasWon && moves + 1 === n * n;

    setCell(newGrid);
    setMoves((prev) => prev + 1);

    if (hasWon) {
      setWinner(player);
      setOver(true);
    } else if (isDraw) {
      setOver(true);
    } else {
      setStatus((prev) =>
        prev === cellValue.x ? cellValue.o : cellValue.x
      );
    }
  }

  function resetHandler() {
    setCell(Array.from({ length: n }, () => Array(n).fill("")));
    setStatus(cellValue.x);
    setOver(false);
    setWinner(null);
    setMoves(0);
  }

  function checkWinner(grid, i, j, player) {
    const rowMatch = grid[i].every((item) => item === player);
    const columnMatch = grid.every((row) => row[j] === player);

    let diagonalMatch = false;
    let antiDiagonalMatch = false;

    if (i === j) {
      diagonalMatch = grid.every(
        (row, index) => row[index] === player
      );
    }

    if (i + j === grid.length - 1) {
      antiDiagonalMatch = grid.every(
        (row, index) =>
          row[grid.length - 1 - index] === player
      );
    }

    return (
      rowMatch ||
      columnMatch ||
      diagonalMatch ||
      antiDiagonalMatch
    );
  }

  return (
    <div
      style={{
        height: "100vh",
        gap: "5px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${n}, 40px)`,
          gap: "4px",
        }}
      >
        {cell.map((row, i) =>
          row.map((value, j) => (
            <div
              key={`${i}-${j}`}
              onClick={() => clickHandler(i, j)}
              style={{
                width: "40px",
                height: "40px",
                cursor: "pointer",
                border: "1px solid black",
                borderRadius: "3px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                fontSize: "20px",
                fontWeight: "bold",
              }}
            >
              {value}
            </div>
          ))
        )}
      </div>

      <div style={{ fontSize: "20px" }}>
        {winner
          ? `Winner: ${winner}`
          : isOver
          ? "Draw"
          : `Turn: ${status}`}
      </div>

      <button
        onClick={resetHandler}
        style={{
          padding: "5px 10px",
          borderRadius: "4px",
          fontSize: "16px",
        }}
      >
        Reset
      </button>
    </div>
  );
};

export default App;
