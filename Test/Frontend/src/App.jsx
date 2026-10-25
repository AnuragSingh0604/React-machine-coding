import React,{useContext} from 'react'
import dataContext from './Context/dataContext';
import Folder from './component/Folder';
import File from './component/File';

const App = () => {
  const {data}=useContext(dataContext);
  const rootFolder=Object.values(data).filter(item=>item.parentId===null)
  console.log(rootFolder);

  return (
    <div className='container'>
      {
        rootFolder.map((item)=>item.type==="folder"?<Folder key={item.id} item={item}></Folder>:<File key={item.id} item={item}></File>)
      }

    
    </div>
  )
}

export default App