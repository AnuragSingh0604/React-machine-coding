import React,{useContext} from 'react'
import { DemoContext } from './Hooks/DemoContext'

const App = () => {
  const name=useContext(DemoContext);
  return (
    <div>
      <h1>{name}</h1>
    </div>
  )
}

export default App