import React from 'react'

const Modal = ({setShow}) => {
  return (
    <div className="modalContainer">
  <div className="modal">
    <button onClick={()=>setShow(false)}className="cross">X</button>

    Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto facere
    debitis ex autem eveniet doloremque quia ducimus perferendis voluptate
    numquam, illo incidunt rerum culpa.
  </div>
</div>
  )
}

export default Modal