import React from 'react'
import Effect from './component/Effect'
const Text="Hii My name is Anurag Kumar,I am a software engineer";

const App = () => {
  
  return (
    <div className='container'>
      <Effect text={Text} delay={120}></Effect>

    </div>
  )
}

export default App