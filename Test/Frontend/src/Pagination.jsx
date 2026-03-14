import React from 'react'

const Pagination = ({page,setPage}) => {
    let totalPage=15;
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
      
      <button onClick={nextHandler}>&gt;</button>


    </div>
  )
}

export default Pagination;