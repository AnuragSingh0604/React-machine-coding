import React from 'react'
import {Routes,Route} from 'react-router-dom';
import Star from './component/Star';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Star/>}>

      </Route>
    </Routes>
  )
}

export default App