import React, { useState, useEffect } from "react";
import Light from "./component/Light";

const App = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((prev)=>((prev+1)%3))
    }, 3000);

    return () => clearInterval(id);
  }, []);

  return (
    <div className="container">
      {[0, 1, 2].map((i) => (
        <Light
          key={i}
          item={i}
          activeIndex={index}
         
        />
      ))}
    </div>
  );
};

export default App;