import React, { useState, useRef } from "react";

const List = ({ height = 300, width = 600, itemHeight = 25 }) => {
  const [arr] = useState(() =>
    Array.from({ length: 50 }, (_, i) => `item ${i + 1}`)
  );

  const [startIndex, setStartIndex] = useState(0);
  const rafIdRef = useRef(null);

  const visibleCount = Math.ceil(height / itemHeight);
  const OVERSCAN = 3;

  function scrollHandler(e) {
    if (rafIdRef.current) return;

    const scrollTop = e.target.scrollTop;

    rafIdRef.current = requestAnimationFrame(() => {
      const nextIndex = Math.min(
        arr.length - visibleCount,
        Math.floor(scrollTop / itemHeight)
      );
     
      setStartIndex(nextIndex);
      rafIdRef.current = null;
    });
  }

  const from = Math.max(0, startIndex - OVERSCAN);
  const to = Math.min(arr.length, startIndex + visibleCount + OVERSCAN);
  const res = arr.slice(from, to);
  const yOffset = from * itemHeight;

  return (
    <div
      onScroll={scrollHandler}
      style={{
        width,
        height,
        overflowY: "auto",
        backgroundColor: "white",
        margin: "20px 40px"
      }}
    >
      <div style={{ height: arr.length * itemHeight }}>
        <div
          style={{
            transform: `translateY(${yOffset}px)`,
            willChange: "transform" 
          }}
        >
          {res.map((item, index) => (
            <div
              key={from + index}
              style={{
                height: itemHeight,
                backgroundColor: "orange",
                borderBottom: "1px solid black",
                textAlign: "center"
              }}
            >
              {item}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default List;
