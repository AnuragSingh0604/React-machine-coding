import React from 'react';

const Grid = ({ size }) => {
  const arr = Array.from({ length: size }, () => new Array(size));

  return (
    <div
      className="Grid"
      style={{
        gridTemplateColumns: `repeat(${size}, 1fr)`,
      }}
    >
      {arr.map((rowItem, row) =>
        rowItem.map((_, col) => (
          <div
            className="cell"
            key={`${row}-${col}`}
          ></div>
        ))
      )}
    </div>
  );
};

export default Grid;