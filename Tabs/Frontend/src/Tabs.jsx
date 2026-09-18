import React from 'react'

const Tabs = ({data}) => {
    console.log(data.title)
  return (
    <div className='tabsdata'>
        <h1>{data.data.title}</h1>
    </div>
  )
}

export default Tabs