import React ,{useEffect, useState}from 'react'

const useDebounce = (value,delay) => {
    const [newValue,setNew] = useState(null);
    useEffect(()=>{
        const timeoutId=setTimeout(()=>{
           
            setNew(value);
        },delay);
    return ()=>clearTimeout(timeoutId);

    },[value,delay]);


  return newValue;
}

export default useDebounce;