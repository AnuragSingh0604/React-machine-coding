import React, { useState } from 'react'
import Modal from './components/Modal'

const App = () => {
  const [show,setShow]=useState(false);
  return (
    <div className='container'>
<button onClick={() => setShow(true)}>
  Show Modal
</button>
      {show &&  <Modal setShow={setShow}/>}
     

    </div>
  )
}

export default App