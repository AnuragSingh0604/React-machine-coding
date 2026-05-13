import React,{useState} from 'react'

const Root = ({item}) => {
     const [data,setData]=useState(item);
  return (
    <div style={{marginLeft:"1em"}}>
  <input checked={item.status === "checked"} id={data.id} type="checkbox" />
  <label htmlFor={data.id}>{data.label}</label>
  {
    data.children.map((c,i)=><Root item={c} key={c.id}></Root>)
  }
</div>
  )
}

export default Root