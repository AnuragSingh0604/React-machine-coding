import React, { useState } from 'react'

const Accordian = ({item1}) => {
    
    const [show,setShow]=useState(false);
  return (
    <div className='faq'>
        <h3>{item1.question}</h3>
         <span  className='btn' onClick={()=>(setShow(!show))}>{show ? '-' : '+'}</span>
      
        <div>
            {show && item1.answer}
        </div>
       
    </div>
  )
}

export default Accordian;