import React, { useEffect, useState,useRef } from 'react'

const App = () => {
  const [loading,setLoading]=useState(false);
  const [data,setData]=useState(()=>[]);
  const [index,setIndex]=useState(0);
  const intervalRef=useRef(null);
  useEffect(()=>{
    async function  fetchData(){
      try{
        setLoading(true);
        const res=await fetch("https://picsum.photos/v2/list?page=1&limit=5");
        if(!res.ok){
          throw new Error("error in fetching image");
        }
        const newData=await res.json();
      if(newData && newData.length > 0){
        setData(newData.map(item=>item.download_url));
      }
      else{
        throw new Error("something went wrong");
      }

      

    }
    catch(e){
    console.error("Fetch failed:", e.message);
  }
  finally{
setLoading(false);
  }
  }
    fetchData();

  },[])
  function clickNextHandler(){
    if(data.length===0){
      return;
    }
    if(intervalRef.current){
      clearInterval(intervalRef.current);
      intervalRef.current=null;
    }
    
    setIndex(prev=>{
      if(prev>=data.length-1){
        return 0;
      }
      else{
        return prev+1;
      }
    });
     
  }
  function startInterval() {

  if(data.length === 0) return;

  // Always clear existing interval first
  if(intervalRef.current) {
    clearInterval(intervalRef.current);
  }

  intervalRef.current = setInterval(() => {

    setIndex(prev =>
      prev >= data.length - 1 ? 0 : prev + 1
    );

  }, 1000);
}
  function clickPrevHandler(){
    if(data.length===0){
      return;
    }
    if(intervalRef.current){
      clearInterval(intervalRef.current);
      intervalRef.current=null;
       
    }
    setIndex(prev=>Math.max(prev-1,0));
    
    

  }
  function stopInerval(){
    clearInterval(intervalRef.current);
      intervalRef.current=null;
      return;

  }

  useEffect(()=>{
    startInterval()
   
    return ()=>{
     return stopInerval();
     

    }
     
  },[data.length])

  return (
    !loading &&
    <div onMouseEnter={stopInerval} onMouseLeave={startInterval} className='container'>
      
      <img src={data[index]}></img>
      <button  onClick={clickPrevHandler} className='prev'>{"<"}</button>
      <button onClick={clickNextHandler} className='next'>{">"}</button>

    </div>
  )
}

export default App