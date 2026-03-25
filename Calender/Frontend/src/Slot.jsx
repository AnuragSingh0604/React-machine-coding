import React from 'react'

const Slot = ({item}) => {
  return (
    <div className='slot'>
    <span>{String(item).padStart(2, "0")}:00</span>
     <div className='line'></div>



    </div>
  )
}

export default Slot;