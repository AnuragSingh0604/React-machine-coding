import React from 'react'

const Pagination = ({page,setPage}) => {
   let totalPage=15;
  const prevThreepage=Array.from({length:3},(item,index)=>page-1-index).reverse().filter((item,index)=>item>0);
   const nextFourPage=Array.from({length:4},(item,index)=>page+index).filter((item,index)=>item<=totalPage);
  const allPage=[...prevThreepage,...nextFourPage];
   
    function prevHandler(){
        if(page<=1){
            return;
        }
       
        setPage(prev=>prev-1);
    }
    function nextHandler(){
        if(page>=totalPage){
            return;
        }
        setPage(prev=>prev+1);
    }
  return (

    <div className='paginationContainer'>
      <button onClick={prevHandler}>&lt;</button>
      {
        allPage.map((value,index)=><button className={page===value?"active":""} onClick={()=>setPage(value)} key={index}>{value}</button>)
      }
      
      <button onClick={nextHandler}>&gt;</button>


    </div>
  )
}

export default Pagination;