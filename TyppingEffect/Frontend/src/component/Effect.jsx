import React, { useEffect, useRef, useState } from "react";

const Effect = ({ text, delay }) => {
  const [data, setData] = useState("");
  const indexRef = useRef(0);
  const directionRef = useRef(1);

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (indexRef.current === text.length) {
        directionRef.current = -1;
      }

      if (indexRef.current === 0) {
        directionRef.current = 1;
      }

      indexRef.current += directionRef.current;

      setData(text.slice(0, indexRef.current));
    }, delay);

    return () => clearInterval(intervalId);
  }, [text, delay]);

  return (
    <div className="effect">
      <h1>Typing Effect</h1>
      <p>{data}<span className="cursor">|</span></p>
    </div>
  );
};

export default Effect;