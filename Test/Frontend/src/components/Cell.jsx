import React from 'react'

const Cell = ({inputRef,i,handler,data,keydownHandler}) => {
    
   


    return (
    <input type="text"  inputMode="numeric"  pattern="[0-9]*" onKeyDown={(e)=>keydownHandler(e,i)} value={data} onChange={(e)=>handler(e.target.value,i)} ref={(e)=>e && (inputRef.current[i]=e)} className='cell'></input>
  )
}

export default Cell