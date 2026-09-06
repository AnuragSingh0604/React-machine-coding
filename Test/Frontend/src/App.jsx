import React from 'react'
import Grid from './component/Grid'

const App = ({size=3}) => {
  return (
    <div className='container'>
      <Grid size={size} />

    </div>
  )
}

export default App