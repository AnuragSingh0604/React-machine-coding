import React,{useState,useEffect} from 'react'
import Post from "./Post.jsx"
const status={
  loading:"LOADING",
  success:"SUCCESS",
  error:"ERROR",
}

const InfiniteScroll = () => {
    const [data,setData]=useState([]);
    const [page,setPage]=useState(1);
    const [state,setState]=useState(status.loading);
    useEffect(
        ()=>{
          try{
            setState(status.loading);
        
           async function fetchImage(){
            const res=await fetch(`https://picsum.photos/v2/list?page=${page}&limit=3`);
            if (!res.ok) throw new Error("Network error");
            const newData=await res.json();
            if(newData?.length>0)
            {
           setData((prev)=>([...prev,...newData]));
           setState(status.success);
            }
            else{
              setState(status.error);
            }
           }


           fetchImage();


          }
          catch(e){
               console.log(e.message)
               setState(status.error);
          }

        },[page]
    );
    
  return (
    <>
   <>
  <Post data={data} pageNo={setPage} />

  <div className="status">
    {state === status.loading && <p>Loading more...</p>}
    {state === status.error && <p>Error loading images</p>}
  </div>
</>

    </>
   
  )
}

export default InfiniteScroll;