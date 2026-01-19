import React, { useState ,useEffect,useRef} from 'react';
import axios from 'axios';


const Carousel = () => {
    const [data,setData]=useState(()=>[]);
    const [index,SetIndex]=useState(0);
   const interverId = useRef(null);


    const nextHandler = () => {
      if(data.length===0) return;
  SetIndex(prev =>prev === data.length - 1 ? 0 : prev + 1
  
  );
};
const prevHandler=()=>{
  if(data.length===0) return;
  SetIndex(prev=> prev===0 ?data.length-1:prev-1);
}
const startInterval = () => {
   if(data.length===0) return;
  clearInterval(interverId.current);
  interverId.current = setInterval(nextHandler, 1000);
};

const stopInterval = () => {
  clearInterval(interverId.current);
  interverId.current = null;
};

    
   useEffect(() => {
  async function fetchImage() {
    try {
      const res = await axios.get(
        "https://picsum.photos/v2/list?page=1&limit=5"
      );
      setData(res.data.map(item => item.download_url));
    } catch (e) {
      console.log(e);
    }
  }

  fetchImage();
}, []);
useEffect(()=>{
 
 startInterval();
  return  () => stopInterval();

},[data.length])

  return (
    <div onMouseEnter={stopInterval
    }
   onMouseLeave={startInterval
   }
    
    className='container'>
        <div onClick={prevHandler} className='prev'>{"<"}</div>
        {data.length > 0 && <img src={data[index]} alt="image" />}

        <div onClick={nextHandler}className='next'>{">"}</div>

    </div>
  )
}

export default Carousel;