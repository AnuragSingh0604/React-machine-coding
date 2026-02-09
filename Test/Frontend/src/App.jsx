import React from 'react'
import { useState } from 'react';

const App = () => {
  const [crrStep,setcrrStep]=useState(0);
  const steps=[{
    label: "Personal Info",
    content : <div>Personal Information Content</div>
  },{
    label: "Account Info",
    content : <div>Account Information Content</div>},
    {
    label: "Payment Info",
    content : <div>Payment Information Content</div>}
    ,{
    label: "Confirmation Info",
    content : <div>Confirmation Information Content</div>}
    ,{
    label: "Review Info",
    content : <div>Review Information Content</div>}

];
function clickHandler(){
  if(crrStep===steps.length)
  {
    return;
  }
  setcrrStep((prev)=>prev+1);
}
console.log(crrStep);
  return (
    <div className='mainContainer'>
      
        <div className='labelContainer'>
          {
        steps.map((item, index) => {
  return (
   <div
 
  className="step"
  key={index}
>

      <div  className={`circle ${(index+1 <= crrStep) && "active"}`}>{index + 1}</div>

      <p className="text">{item.label}</p>

      {index !== steps.length - 1 && <div className={`line ${(index+1 <= crrStep) && "active"}`}></div>}
    </div>
  );
})

      }
      <button className='btn' onClick={clickHandler}>next</button>
        </div>
        <div style={{width:"50%" , height:" 40vh",backgroundColor:"gray",display:"flex", alignItems:"center", justifyContent:"center" ,fontSize:"25px"}}>{ crrStep>0 && steps[crrStep-1].content}</div>
      
    </div>
  )
}

export default App