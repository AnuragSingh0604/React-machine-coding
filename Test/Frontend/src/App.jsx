import React, { useState,useRef } from 'react'

const arr = Array.from({ length: 50 }, (_, index) => index + 1);

const App = ({ height = 300, width = 400, itemHeight = 30 }) => {
  const [startIndex, setStartIndex] = useState(0);
  const rafIdRef=useRef(null);
  const OVERSCAN = 3;

  const visibleCount = Math.ceil(height / itemHeight);

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
      style={{ height, width, border: "1px solid black", overflowY: "auto" }}
    >
      <div style={{ height: arr.length * itemHeight }}>
        <div  style={{
            transform: `translateY(${yOffset}px)`,
            willChange: "transform" 
          }}>
       
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
}

export default App;