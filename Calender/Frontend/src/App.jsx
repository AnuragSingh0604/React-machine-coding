import React from 'react'
import Slot from './Slot';
import Event from './Event';
import data from './data.js'

const App = () => {
  const totalSlot=Array.from({length:24},(_,index)=>index);
  return (
    <div className='container'>
      {
        totalSlot.map((item,index)=><Slot item={item}></Slot>)
      }
      {
        data.map((event,index)=><Event key={event.id} event={event}></Event>)
      }
     
      

    </div>
  )
}

export default App