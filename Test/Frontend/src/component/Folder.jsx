import React, { useState,useContext } from 'react';
import dataContext from '../Context/dataContext';
import File from './File';

const Folder = ({item}) => {
  const [isOpened, setIsOpened] = useState(false);
    const {data,addData}=useContext(dataContext);


  return (
    <>
    <div className="folder" >
      <span>
        <img
        onClick={() => setIsOpened(prev => !prev)}
          src={isOpened ? "/open_folder.png" : "/closed_folder.png"}
          alt="Folder"
        />
      </span>
      <span>{item.name}</span>
      <div className='btn'>
        <button>add</button>
          <button>edit</button>
           <button>delete</button>
      </div>

    </div>
    {
       isOpened && item.children.map((child)=> data[child].type==="folder"?<Folder key={data[child].id} item={data[child]}></Folder>:<File key={data[child].id} item={data[child]}></File>)
    }
    </>
  );
};

export default Folder;