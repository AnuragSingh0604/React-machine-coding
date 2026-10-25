import React,{createContext} from 'react'
import fileData from '../data';
import { useState } from 'react';

const dataContext=createContext(fileData.items);

export default dataContext;
export const DataContextProvider = ({ children }) => {
    const [data,setdata]=useState(fileData.items)
   function addData(newItem, type, pid) {
  setdata(prev => {
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
  return (
    <dataContext.Provider value={{data,addData}}>
      {children}
    </dataContext.Provider>
  );
};
