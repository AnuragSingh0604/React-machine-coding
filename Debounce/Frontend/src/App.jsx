import React, { useState } from 'react'
import useDebounce from './Hooks/useDebounce';

const App= () => {
  const [search,setSearch]= useState("");
  const debounceValue=useDebounce(search,2000);
  return (
  
    <div>
      <input value={search} onChange={(e)=>setSearch(e.target.value)}></input>
      <h2>normal value:{search}</h2>
      <h2>debounced value:{debounceValue}</h2>

    </div>
  )
}

export default App;