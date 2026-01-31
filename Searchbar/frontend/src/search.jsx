import React, { useEffect, useState } from 'react'
const state={
  "loading":"LOADING",
  "error":"ERROR",
  "success":"SUCCESS"

}

const Search = () => {
    const [data,setData]=useState([]);
    const [query,setQuery]=useState("");
    const [status,setStatus]=useState(state.loading);
    useEffect( ()=>{
      
         const controller = new AbortController();
         async function fetchData(){
            try {
              setStatus(state.loading);
  const response = await fetch(
    `https://dummyjson.com/products/search?q=${query}&limit=10`,{signal:controller.signal}
  );

  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }

  const newdata = await response.json();

  
  if(newdata?.products?.length>0){
    
    setData(newdata.products);
    setStatus(state.success);
  }
  
} catch (error) {
  if (error.name !== "AbortError") {
    console.error("Fetch failed:", error);
    setStatus(state.error);
  }
}

            
         }
         const id=setTimeout(()=>fetchData(),300);
return ()=>{
    clearTimeout(id);
    controller.abort();};
    
    },[query])
   

  return (
    <div className='container'>
        <input className="input" value={query} onChange={(e)=>setQuery(e.target.value)} type="text" placeholder='serach'></input>
        { status === state.loading && <h1>Loading...</h1>}
        {status=== state.error && <h1>Error...</h1>}
      {status ===state.success && <ul className='list'>
          {data.map((item,index)=>(
              <li key={index}>{item.title}</li>
          ))}
      </ul>}
    </div>
  )
}

export default Search; 