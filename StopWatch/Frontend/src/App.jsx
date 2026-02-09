import React, { useState ,useRef} from 'react'

const App = () => {
  const [box,setBox]=useState(()=>new Array(3).fill(0));
  const intervalId=useRef(null);
  const boxRef=useRef([]);
  function starthandler(){
      if(intervalId.current){
        return;
      }
       intervalId.current=setInterval(()=>{
        setBox((prev)=>{
          const copy=[...prev];
        
          copy[2]=copy[2]+1;
            if(copy[2] >= 60){
              copy[2]=0;
              copy[1]=copy[1]+1;

            }
            if(copy[1]>=60){
              copy[1]=0;
              copy[0]=copy[0]+1;

            }
          return copy;
        })

    },1000);
       
  }
  function pauseHandler(){
   clearInterval(intervalId.current);
   intervalId.current=null;
  }
  function stophandler(){
   clearInterval(intervalId.current);
   intervalId.current=null;
   setBox(prev=>[...prev].fill(0));
  }
  return (
    <>
   <div className='container'>
    {
      box.map((item,index)=>{
       
       
         return  <><div  ref={(e)=>boxRef.current[index]=e} key ={index} className='box'>{item}</div>
             {index < box.length-1 && <p>:</p>}
              
            </>
           
      })
    }

   </div>
   <div className='buttonContainer'>
    <button onClick={()=>starthandler()}>start</button>
     <button onClick={pauseHandler}>pause</button>
      <button onClick={stophandler}>stop</button>
     </div>
     </>
  )
}

export default App