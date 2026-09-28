import React from 'react'
import Grid from './component/Grid'

const App = ({size=20}) => {
  return (
    <div className='container'>
      <Grid size={size} />

    </div>
  )
}

export default App