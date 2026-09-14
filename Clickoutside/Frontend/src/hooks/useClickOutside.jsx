import { useEffect } from "react";

const useClickOutside = (ref, callback) => {
  useEffect(() => {
    function handleClick(e) {
      if (ref.current && !ref.current.contains(e.target)) {
        callback();
      }
    }

    document.addEventListener("pointerdown", handleClick);

    return () => {
      document.removeEventListener("pointerdown", handleClick);
    };
  }, [ref, callback]);
};

export default useClickOutside;