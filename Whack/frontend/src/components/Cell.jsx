import React from "react";

const Cell = ({ isMole }) => {
  return (
    <div className="cell">
      {isMole ? "🐹" : ""}
    </div>
  );
};

export default Cell;