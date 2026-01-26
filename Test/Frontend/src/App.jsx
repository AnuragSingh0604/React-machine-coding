import React, { useState } from "react";

const App = ({ length = 5 }) => {
  const [arr, setArr] = useState(() => new Array(length).fill(""));

  function inputHandler(e, index) {
    const value = e.target.value;
    setArr(prev => {
      const copy = [...prev];
      copy[index] = value;
      return copy;
    });
  }

  return (
    <div className="container">
      {arr.map((item, index) => (
        <input
          key={index}
          value={item}
          onChange={(e) => inputHandler(e, index)}
          type="text"
          className="box"
        />
      ))}
    </div>
  );
};

export default App;
