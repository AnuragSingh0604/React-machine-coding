import React from 'react'
import Faq from './components/Faq'
import { Route,Routes } from 'react-router-dom'

const App = () => {
  return (
    <Routes>
      <Route path='/' element= {<Faq></Faq>}>
    
      </Route>
    </Routes>
  )
}

export default App