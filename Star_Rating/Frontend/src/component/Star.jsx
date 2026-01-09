import React from 'react';
import { useState } from 'react';

const Star = () => {
  const [crrClicked,setCrrClicked]=useState(-1);
  const [crrHovered,setHoverd]=useState(-1);
  function clickHandler(index){
    setCrrClicked(index);
  }
  function hoveredHandler(index){
    return setHoverd(index);
  }
  return (
    <div className='container'> 
      <div className='inner'>
      {[...new Array(5).fill(0)].map((_, index) => (
        <span onMouseEnter={() => hoveredHandler(index)} onMouseLeave={() => setHoverd(-1)} onClick={()=>clickHandler(index)} className={`star ${(crrHovered >= 0
    ? index <= crrHovered  
    : index <= crrClicked) ? 'active' :''}`} key={index}>&#9734;</span>
      ))}
      </div>
    </div>
  );
};

export default Star;
