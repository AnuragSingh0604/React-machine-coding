import React,{createContext} from 'react'
import fileData from '../data';
import { useState } from 'react';

const dataContext = createContext(null);
export default dataContext;
export const DataContextProvider = ({ children }) => {
    const [data,setdata]=useState(fileData.items)
   function addData(newItem, type, pid) {
  setdata(prev => {
    if (pid != null && !prev[pid]) {
      return prev;
    }

    const newdata = {};

    for (const key in prev) {
      newdata[key] = {
        ...prev[key],
        children: [...prev[key].children],
      };
    }

    const newId =
      Math.max(0, ...Object.values(prev).map(item => Number(item.id))) + 1;

    newdata[newId] = {
      id: newId,
      name: newItem,
      type,
      parentId: pid ?? null,
      children: [],
    };

    if (pid != null) {
      newdata[pid] = {
        ...newdata[pid],
        children: [...newdata[pid].children, newId],
      };
    }

    return newdata;
  });
}
function editData(newItem, type, id) {
  setdata((prev) => {
    if (!prev[id]) return prev;

    const newdata = structuredClone(prev);

    // If folder is becoming a file
    if (type === "file") {
      function deleteChildren(parentId) {
        const children = newdata[parentId].children;

        for (const childId of children) {
          deleteChildren(childId);
          delete newdata[childId];
        }
      }

      deleteChildren(id);
    }

    newdata[id] = {
      ...newdata[id],
      name: newItem,
      type,
      children: type === "file" ? [] : newdata[id].children
    };

    return newdata;
  });
}
function deleteData(id) {
  setdata((prev) => {
    if (!prev[id]) return prev;

    const newdata = {};

    // Create a copy of the data
    for (const key in prev) {
      newdata[key] = {
        ...prev[key],
        children: [...prev[key].children],
      };
    }

    // Remove this item from its parent's children
    const parentId = newdata[id].parentId;

    if (parentId != null && newdata[parentId]) {
      newdata[parentId] = {
        ...newdata[parentId],
        children: newdata[parentId].children.filter(
          (childId) => childId !== id
        ),
      };
    }

    // Recursively delete the item and all descendants
    function removeNode(currentId) {
      const current = newdata[currentId];

      if (!current) return;

      for (const childId of [...current.children]) {
        removeNode(childId);
      }

      delete newdata[currentId];
    }

    removeNode(id);

    return newdata;
  });
}


  
  return (
    <dataContext.Provider value={{data,addData,editData,deleteData}}>
      {children}
    </dataContext.Provider>
  );
};
