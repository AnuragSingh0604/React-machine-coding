import React from 'react'

const Event = ({event}) => {
  return (
    <div className='event'>
        <div className='timeContainer'>
        <span>{event.start}</span>
         <span>-</span>
         <span>{event.end}</span>
         </div>
        <span>{event.title}</span>
        

    </div>
  )
}

export default Event