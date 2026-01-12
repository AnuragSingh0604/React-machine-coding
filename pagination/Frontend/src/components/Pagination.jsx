import React from 'react'

const Pagination = ({page,setPage}) => {
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
        
        <div className="page-btn">{page}</div>
        <div onClick={handleNext} className="page-btn">
            {'>'}
        </div>
    </div>
  )
}

export default Pagination