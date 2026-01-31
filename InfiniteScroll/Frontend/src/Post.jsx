import React,{useEffect, useRef} from 'react'

const Post = ({data,pageNo}) => {
  const lastImageRef=useRef(null);
  useEffect(()=>{
    if (!lastImageRef.current) return;
    const obserever= new IntersectionObserver((param)=>{
            const targetElement=param[0];
            if(targetElement.isIntersecting){
              pageNo((prev)=>prev+1)
            }
    },{threshold: 0.5})


    obserever.observe(lastImageRef.current);
    return () => obserever.disconnect();

  },[data])
    
  return (
    <div className='container'>
        
        
        {
            data.map((item,index)=>{
              const lastIndex= index===data.length-1;
               return  <img 
               loading="lazy"
               
               ref={ lastIndex?lastImageRef:null} className="image"key={index} src={item.download_url} alt="image"></img>
            })
       }
       
    </div>
  )
}

export default Post