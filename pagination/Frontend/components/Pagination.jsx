'use client'

import React from 'react'

const Pagination = ({page,setPage}) => {
  const prevThreeNoArr=Array.from(
    {length:3},
    (_,index)=>page-1-index
  ).filter(item=>item>0).reverse();
  const nextFourNoarr=Array.from(
    {length:4},
    (_,index)=>page+index
  );
  const paginationArray=[...prevThreeNoArr,...nextFourNoarr];
    function handleNext(){
        setPage(prev=>prev+1);
    }
     function handlePrevious(){
        setPage(prev=>prev-1);
        
    }
  return (
    <div className='pagination-container'>
        {page >1 && <div onClick={handlePrevious} className="page-btn">
           {"<"}
        </div>}
        
        {
             paginationArray.map((value)=>{
              return <div key={value} className={` ${page===value ? "active" :"page-btn"}`} onClick={()=>setPage(value)}>{value}</div>
             })
        }
        <div onClick={handleNext} className="page-btn">
            {'>'}
        </div>
    </div>
  )
}

export default Pagination
