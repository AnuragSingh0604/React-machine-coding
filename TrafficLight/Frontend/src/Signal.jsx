import React from 'react'

const Signal = ({ isActive, color }) => {
  return (
    <div
      className='signal'
      style={{
        backgroundColor: isActive ? color : "gray"
      }}
    />
  )
}

export default Signal;