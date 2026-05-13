import React,{useState} from 'react'
import data from "./data.js"
import Root from "./components/Root.jsx"

const App = () => {
 

  return (
    data.map((item,index)=><Root item={item} key={item.id} ></Root>)
     
   
  )
}

export default App