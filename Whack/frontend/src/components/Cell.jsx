import { useEffect, useState } from "react";
import React from "react";

const Cell = ({ isMole,Score }) => {
  const [isClicked,setisClicked]=useState(false);
  useEffect(()=>{
    let id=null
    if(isClicked){
      id=setTimeout(()=>setisClicked(false),1000)
    }
  return ()=>clearTimeout(id);

  }
   ,[isClicked])
  function clickHandler() {
  if (!isMole || isClicked) return;

  setisClicked(true);
  Score(prev => prev + 10);
}
  return (
    <div onClick={clickHandler} style={{ border: isClicked ? "1px solid green" : "1px solid black" }} className="cell">
      {isClicked ? "🔨" : isMole ? "🐹" : ""}
    </div>
  );
};

export default Cell;