import React from 'react'

const SubContainer = ({hanlder}) => {
    
  return (
    <div className='subcontainer'>
        <div className='iconContainer'>
             <img src="uploader.jpg" alt="uploader" />
            

        </div>
         <input id="input" type='file' onChange={hanlder}  multiple></input>
             <label htmlFor='input'>Browse Files</label>

       

    </div>
  )
}

export default SubContainer