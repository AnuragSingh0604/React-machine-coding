import React from 'react'

const Slot = ({item}) => {
  return (
    <div className='slot'>
    <span>{item}:00</span>
     <div className='line'></div>



    </div>
  )
}

export default Slot;