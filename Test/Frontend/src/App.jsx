import React, { useRef, useState } from 'react'

const App = ({length=5}) => {
    const [input,setInput]=useState(()=>(new Array(length).fill(" ")))
    const inputRef= useRef([]);
    function handleChange(e,index){
      const {value}=e.target;
      const res=value.slice(value.length-1);
      const check=/^[0-9]$/.test(res);
      if(check){
      setInput((prev)=>{
        prev[index]=res;
        return [...prev];
      })
      if(index <input.length-1)
    {
      inputRef.current[index+1].focus()
    }
      
    }
    
    return;
    }

  return (
    <div className="container">
      {input.map((item, index) => (
        <input
          type="text"
          key={index}
          ref={(e)=>inputRef.current[index]=e}
          className="input"
          value={item}
          onChange={(e) => handleChange(e, index)}
        />
      ))}
    </div>
  );
};

export default App;