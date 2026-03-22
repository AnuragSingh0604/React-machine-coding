import React, { useState } from "react";

const App = ({ n = 5 }) => {
  const [crrIndex, setCrrIndex] = useState(-1);
  const [hoverIndex, setHoverIndex] = useState(-1);

  return (
    <div style={{ display: "flex", justifyContent: "center", gap: "5px", fontSize: "30px" }}>
      {[...Array(n)].map((_, index) => {
        const activeIndex = hoverIndex >= 0 ? hoverIndex : crrIndex;

        return (
          <span
            key={index}
            onMouseEnter={() => setHoverIndex(index)}
            onMouseLeave={() => setHoverIndex(-1)}
            onClick={() => setCrrIndex(index)}
            style={{
              cursor: "pointer",
              color: index <= activeIndex ? "gold" : "gray"
            }}
          >
            {index <= activeIndex ? "★" : "☆"}
          </span>
        );
      })}
    </div>
  );
};

export default App;