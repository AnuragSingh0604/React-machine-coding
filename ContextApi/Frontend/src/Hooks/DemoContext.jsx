import { createContext } from "react";
 export const DemoContext= createContext();


  export const DemoProvider=({children})=>{
    const name="Anurag"


    return <DemoContext.Provider value={name}>
        {children}

    </DemoContext.Provider>

  }