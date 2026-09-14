import React, { useRef } from "react";
import useClickOutside from "../hooks/useClickOutside";

const Modal = ({ setShow }) => {
  const modalRef = useRef(null);

  useClickOutside(modalRef, () => {
    setShow(false);
  });

  return (
    <div ref={modalRef} className="modalContainer">
      <div  className="modal">
        <button
          onClick={() => setShow(false)}
          className="cross"
        >
          X
        </button>

        Lorem ipsum dolor sit amet consectetur adipisicing elit.
        Architecto facere debitis ex autem eveniet doloremque quia
        ducimus perferendis voluptate numquam, illo incidunt rerum culpa.
      </div>
    </div>
  );
};

export default Modal;