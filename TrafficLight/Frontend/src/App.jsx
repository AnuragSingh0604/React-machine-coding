import React, { useEffect, useState } from 'react'
import Signal from './Signal'

const App = ({ light = ["red", "yellow", "green"] }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % light.length);
    }, 3000);

    return () => clearInterval(id);
  }, [light.length]);

  return (
    <div className='container'>
      {light.map((item, index) => (
        <Signal
          key={index}
          isActive={currentIndex === index}
          color={item}
        />
      ))}
    </div>
  );
};

export default App;