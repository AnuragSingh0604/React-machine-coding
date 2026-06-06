import React, { useState ,useRef, useEffect} from 'react';
import Cell from './components/Cell';


const App = ({size=5}) => {
  
  const [arr, setArr] = useState(() => new Array(size).fill(''));
 
  const refIndex=useRef([]);
  useEffect(()=>{
    refIndex.current[0]?.focus();

  },[])
  function setHandler(value,i){
    value=value.slice(-1);
    const check=/^[0-9]$/.test(value);

    if(check){
      setArr((p)=>{
        let newArray=[...p];
        newArray[i]=value;
        return newArray

      })
      refIndex.current[Math.min(i+1,refIndex.current.length-1)].focus();
    }




  }
  function keydownHandler(e,i){
    
    if(e.key=="Backspace"){
       if(arr[i]){
        setArr((p)=>{
        let newArray=[...p];
        newArray[i]='';
        return newArray

      })
     

       }
       else{
        refIndex.current[Math.max(i-1,0)].focus();
  

       }
       return;
       
    }
    if(e.key=="ArrowRight")
    refIndex.current[Math.min(i+1,refIndex.current.length-1)].focus();
  if(e.key=="ArrowLeft")
    refIndex.current[Math.max(i-1,0)].focus();
  

    

  }
  
  return (
    <div className='container'>
      {
        arr.map((item,index)=><Cell  keydownHandler={keydownHandler}data={item} handler={setHandler} inputRef={refIndex} i={index} key={index}></Cell>)
      }
    </div>
  )
}

export default App