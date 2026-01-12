import React from 'react'
import {Routes,Route} from 'react-router-dom';
import Post from './components/post';

const App = () => {
  return (
   <Routes>
    <Route path='/' element={<Post/>}> </Route>
   </Routes>
  )
}

export default App