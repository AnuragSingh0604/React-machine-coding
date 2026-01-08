import React from 'react';
import { useState } from 'react';

const Stepper = () => {
  const [currentStep,setCurrentStep]=useState(0);
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
const handleNext=()=>{
  if(currentStep < steps.length-1)
    setCurrentStep((prev)=>prev+1);
}
const handleBack=()=>{
  if(currentStep > 0)
    setCurrentStep((prev)=>prev-1);
}

return (
    <div className='stepper-container' >
      <div>
        {
   steps.map(({label,content},index)=>{
    return <div className='step' key={index}>
     
        <div className={`step-number ${index <= currentStep ? "active" :""}`}>{index + 1}</div>

    { index < steps.length -1 &&
       <div className={`step-line ${index < currentStep ? "active" :""}`}>
        </div>
   }
          <div className="step-label">{label}</div>
         
          
        
</div>
   })
        }
        </div>
        <div className='stepper-body'>
     {steps[currentStep].content}
        </div>
        <div className='stepper-controls'>
          <button onClick={handleNext} className='btn'>next</button>
          <button onClick={handleBack} className='btn'>back</button>


        </div>
        
    </div>
)

}

export default Stepper;