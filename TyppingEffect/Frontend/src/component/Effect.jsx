import React, { useState,useEffect ,useRef} from 'react'

const Effect = ({text,delay}) => {
    const [data,setData]=useState("");
    const ref=useRef(0);
    const [speed,setSpeed]=useState(1);
    useEffect(()=>{
        const intervalId=setInterval(()=>{
            if(ref.current>=text.length){
                setSpeed(p=>-p);
            }
            setData((p)=>{
                
               return p+text[ref.current];
                
               
            })
            
            
            ref.current += speed;
        },delay)
        return ()=>clearInterval(intervalId);
        
    },[text,delay,speed])

  return (
    <div className='effect'>
        <h1>Typping Effect</h1>
        <p>{data}</p>

    </div>
  )
}

export default Effect