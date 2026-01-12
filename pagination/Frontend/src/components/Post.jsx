import React, { useState,useEffect} from 'react'
import Pagination from './Pagination'
import axios from 'axios';


const Post = () => {
    const [data,setData]=useState([]);
    const [page,setPage]=(1);
    
   async function  fetchData(){
    try{
           const res= await axios.get('https://picsum.photos/v2/list?page=2&limit=5');
           if(res?.data){
            setData(res.data);
           }
   
    }
     catch(e){
        console.log(e);
    }
}

    useEffect(
        ()=>{
         fetchData();
        },[page]
    )
    
  return (
    <div className='container'>
        <div className='inner'>
        {data.map(({id,download_url},index)=>{
            console.log(download_url);
            return <img key={id} src={download_url} alt='image'></img>
        })}
        </div>
        <Pagination page={page} setPage={setPage}></Pagination>
    </div>
  )
}

export default Post