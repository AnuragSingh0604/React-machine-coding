import React, { useEffect, useState } from 'react'
import Pagination from './Pagination'

const App = () => {
  const [page,setPage]=useState(1);
  const [imageData,setImagedata]=useState([]);
  async function fetchHandler(){
    try{
    const res= await fetch(`https://picsum.photos/v2/list?page=${page}&limit=5`);
    if(!res.ok){
      throw new Error("erron in fetching image");
    }
    const data=await res.json();
    if(data && data.length>0){
      setImagedata(data);
    }
    else{
      throw new Error("something went wrong ");
    }
  }
  catch(err){
    alert(err);
  }
   

  }
  
  useEffect(()=>{
    fetchHandler();

  },[page])
  return (
    <div className='container'>
      <div className='imageContainer'>
        {
          imageData.map((item,index)=><img key={item.id} src={item.download_url}></img>)
        }

      </div>


<Pagination page={page} setPage={setPage}></Pagination>

    </div>
  )
}

export default App