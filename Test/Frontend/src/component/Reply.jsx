import { useState } from "react"
import React from 'react'

const Reply = () => {
    const [isActive,setIsActive]=useState(false);

  return (
    <div className='btnCon'>
        <button onClick={()=>setIsActive(p=>!p)}>Reply</button>
        {
            isActive && <textarea className="replyBox"></textarea>
        }
        <button>Delete</button>
    </div>
  )
}

export default Reply