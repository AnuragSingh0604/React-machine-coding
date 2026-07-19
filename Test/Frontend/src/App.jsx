import React, { useEffect, useState ,useMemo} from 'react'
function pageGenerator(pageNo,){
  const prevThreeNoArr=Array.from(
    {length:3},
    (_,index)=>pageNo-1-index
  ).filter(item=>item>0).reverse();
  const nextFourPage=Array.from({length:4},(_,index)=>pageNo+index);
  const res=[...prevThreeNoArr,...nextFourPage];
  return res;


}

const App = () => {
  const [data,setData]=useState([]);
 
  const [currentPage,setCurrentPage]=useState(1);
  const pageArray = useMemo(
    () => pageGenerator(currentPage),
    [currentPage]
);
  useEffect(()=>{
    async function fetchData(){
      try{
        const res= await fetch( `https://picsum.photos/v2/list?page=${currentPage}&limit=5`)
        const Data=  await res.json();
        if(Data){
          setData(Data.map((item,index)=>(item.download_url)))
        }
        

      }
      catch(err){
        console.log(err);
      }
      


    }
    fetchData()

  },[currentPage])
  function prevHandler(){
    setCurrentPage((prev)=>Math.max(1,prev-1));
  }
  function nextHandler(){
    setCurrentPage((prev)=>prev+1);
  }

  return (
    <div className='container'>
     <div className='imgContainer'>
      {
       data.map((item,index)=><img src={item} key={index}></img>)
      }
     </div>
<div
  style={{
    display: "grid",
    width: "80%",
    gap: "3px",
    gridTemplateColumns: `repeat(${pageArray.length + 1}, 1fr)`,
    
  }}
  className="pageContainer"
>      
      
       <button
    disabled={currentPage === 1}
    onClick={prevHandler}
>
    &lt;
</button>
      
      {
         pageArray.map((item,index)=><button className={item===currentPage?"active":""}onClick={()=>setCurrentPage(item)}>{item}</button>)
      }
       {
       <button onClick={nextHandler} >&gt;</button>
      }
     </div>


    </div>
  )
}

export default App