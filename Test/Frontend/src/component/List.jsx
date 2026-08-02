import React, { useState } from 'react'
const arr=Array.from({length:50},(_,index)=>index+1);
const visibleCount=Math.ceil(300/25);
const OVERSCAN=3;


const List = () => {
    const [startIndex,setStartIndex]=useState(0);
    const from=Math.max(0,startIndex-OVERSCAN);
    const to=Math.min(arr.length,startIndex+visibleCount+OVERSCAN);
    const res=arr.slice(from,to);
    const yOffset = from * 25;
    function scrollHandler(e){
        console.log( e.target.scrollTop);
        const scrollTop=e.target.scrollTop;
         const nextIndex = Math.min(
        arr.length - visibleCount,
        Math.floor(scrollTop / 25)
      );
      setStartIndex(nextIndex);
    }
  return (
    <div className='container'    onScroll={(e)=>scrollHandler(e)}>
        <div style={{ height: arr.length * 25 }}>
            <div
          style={{
            transform: `translateY(${yOffset}px)`,
            willChange: "transform" 
          }}
        >
        
        {
            res.map((item,index)=><div className="item" key={index}>{item}</div>)
        }
        </div>
        </div>
       

    </div>
  )
}

export default List