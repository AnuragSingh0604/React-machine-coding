import { useState } from 'react'
import usePrevious from "./hoooks/usePrevious.jsx"


function App() {
  const [count, setCount] = useState(0)
  const previous=usePrevious(count);

  return (

    <div className='container'>
     <h1>current:{count},previous:{previous}</h1>
     <button onClick={()=>setCount((prev)=>prev+1)}>click me</button>
     </div>
     
    
  )
}

export default App
