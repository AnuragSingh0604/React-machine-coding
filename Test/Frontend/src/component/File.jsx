import React,{useState} from 'react'

const File = ({item}) => {
  
    
        
          return (
            <div className="file" >
              <span>
                <img
                  src='/file.png'
                  alt="file"
                />
              </span>
              <span>{item.name}</span>
                <button>edit</button>
                  <button>delete</button>
            </div>
          );

  
}

export default File