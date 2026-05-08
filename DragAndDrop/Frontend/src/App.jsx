import React,{useState,useRef} from 'react'
import Column from './Column'
import datas from './data.js'

const App = () => {
  let dragRef=useRef(new Array(2));
 
  const [data,setData]=useState(datas);
  const columns = Object.values(data.columns);
  
  return (
    <div className='container'>
      {
         columns.map((item,index)=><Column  dragRef={dragRef} setData={setData} key={item.id} item={item}></Column>)
      }
    </div>
  )
}

export default App