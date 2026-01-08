import React from 'react'
import OtpInput from './components/otp'
import { Routes, Route } from "react-router-dom";


const App = () => {
  return (
    <Routes>
      <Route path="/:otplength"  element={<OtpInput/>}></Route>
    </Routes>
    
  )
}

export default App