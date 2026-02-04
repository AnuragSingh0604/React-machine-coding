import React, { useRef, useState ,useEffect} from 'react'

const App = ({length=5}) => {
    const [input,setInput]=useState(()=>(new Array(length).fill("")))
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
    function handleKeydown(e,index){
      e.preventDefault;

     
      const {key}=e;
    if(key!=="Backspace" && key!=="ArrowLeft" && key!=="ArrowRight")
    {
      return;
    }
    if(index >0 && key==="Backspace"){
      if(input[index]==="")
      {
         inputRef.current[index-1].focus();
      }
     setInput((prev)=>{
      prev[index]="";
      return [...prev];

     }
      )
      return;
     
    }
    if( index >0 && key==="ArrowLeft"){
          inputRef.current[index-1].focus();
          return;
    }
    if( index<input.length-1 && key==="ArrowRight"){
          inputRef.current[index+1].focus();
          return;
    }
    return;
    
    }
    useEffect(() => {
  inputRef.current[0]?.focus();
}, []);


  return (
    <div className="container">
      {input.map((item, index) => (
        <input
          type="text"
          key={index}
          ref={(e)=>inputRef.current[index]=e}
          className="input"
          value={item}
          inputMode="numeric"
      pattern="[0-9]*"
      autoComplete="one-time-code"
          onKeyDown={(e)=>handleKeydown(e,index)}
          onChange={(e) => handleChange(e, index)}
        />
      ))}
    </div>
  );
};

export default App;