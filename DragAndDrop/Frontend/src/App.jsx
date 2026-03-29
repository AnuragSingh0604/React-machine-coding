import React,{useState,useRef} from 'react'
import Column from './Column'
import datas from './data.js'

const App = () => {
  const ref=useRef(new Array(2));
  const [data,setData]=useState(datas);
  const columns = Object.values(data.columns);
  
  return (
    <div className='container'>
      {
         columns.map((item,index)=><Column dragRef={ref} setdata={setData} key={item.id} item={item}></Column>)
      }
    </div>
  )
}

export default App