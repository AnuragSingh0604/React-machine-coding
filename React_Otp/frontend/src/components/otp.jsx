import React, { useRef, useState,useEffect, } from 'react'
import { useParams } from 'react-router-dom';

const Otp = () => {
   const { otplength } = useParams();
    const length=parseInt(otplength);
   const [otpArr, setOtpArr] = useState(() => new 
  Array(length).fill("")
);
const inputRef= useRef([]);
const handleKeyDown= (e,index)=>{
  
      const key= e.key;
      if(key === "Backspace"){
        e.preventDefault()
        setOtpArr(prev => {
  const copy = [...prev];
  if (copy[index] !== "") {
  copy[index] = "";
} else if (index > 0) {
  inputRef.current[index - 1].focus();
}

  return copy;
} );

return;
      }
      if(key ==="ArrowLeft" && index >0 )
      {
        e.preventDefault();
           inputRef.current[index-1].focus();
           return;
      }
      if(key ==="ArrowRight" && index < otpArr.length-1 )
      {
        e.preventDefault();
           inputRef.current[index+1].focus();
           return;
      }
     
     return;
}
function handleUpdatedvalue(e,index){
  const key= e.target.value;
   const digit = key.slice(-1);
  
   const check=/^[0-9]$/.test(digit);
  
     if(check)
     {
      setOtpArr(prev => {
  const copy = [...prev];
  copy[index] =digit;
  return copy;
});
      if(index < otpArr.length-1)
inputRef.current[index+1].focus();
    }
return;

}
useEffect(() => {
  inputRef.current[0]?.focus();
}, []);

   
  return (
    <div className="otp-container">
  {otpArr.map((value, index) => (
    <input
      key={index}
      className="otp-input"
      type="text"
     
      inputMode="numeric"
      pattern="[0-9]*"
      autoComplete="one-time-code"
      ref={(el) => el && (inputRef.current[index] = el)}
      value={value}
      onChange={(e) => handleUpdatedvalue(e, index)}
      onKeyDown={(e) => handleKeyDown(e, index)}
    />
  ))}
</div>

  )
}

export default Otp;