import React,{useState,useEffect,useRef} from 'react'

const Root = ({item}) => {
     const [data,setData]=useState(item);
     const ref=useRef(null);
     useEffect(() => {
  setData(item);
}, [item]);
     useEffect(()=>{
      
         ref.current.indeterminate = data.status === "indeterminate";
      

     },[data])
     function clickHandler(id) {
    
  setData(prev => updateNode(prev, id));
}
   function updateNode(node, id) {
  if (node.id === id) {
    const newStatus =
      node.status === "checked" ? "unchecked" : "checked";

    return {
      ...node,
      status: newStatus,
      children: node.children.map(child =>
        updateStatus(child, newStatus)
      )
    };
  }

  const updatedChildren = node.children.map(child =>
    updateNode(child, id)
  );

  return {
    ...node,
    children: updatedChildren,
    status: getParentStatus(updatedChildren)
  };
}
function getParentStatus(children) {
  const allChecked = children.every(child => child.status === "checked");
  const allUnchecked = children.every(child => child.status === "unchecked");

  if (allChecked) return "checked";
  if (allUnchecked) return "unchecked";

  return "indeterminate";
}
function updateStatus(node, status) {
  return {
    ...node,
    status,
    children: node.children.map(child =>
      updateStatus(child, status)
    )
  };
}
      
     

  return (
    <div style={{marginLeft:"1em"}}>
  <input  onChange={ ()=>clickHandler(data.id)} ref={ref} checked={data.status === "checked"} id={data.id} type="checkbox" />
  <label htmlFor={data.id}>{data.label}</label>
  {
    data.children.map((c,i)=><Root item={c} key={c.id}></Root>)
  }
</div>
  )
}

export default Root;