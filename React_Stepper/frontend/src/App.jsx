import React from 'react'
import {Routes,Route} from 'react-router-dom';
import ReactStepper from "./components/Stepper";


const App = () => {
  return (
    <Routes>
      <Route path="/home" element={<ReactStepper/>} ></Route>
    </Routes>
  )
}

export default App;