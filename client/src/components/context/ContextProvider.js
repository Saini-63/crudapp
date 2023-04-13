import React ,{createContext, useState} from 'react';
import Homeuser from '../Homeuser';
import Register from '../Register';

export const addData = createContext("");

const ContextProvider = ()=>{
    const [udata,setUdata] = useState(false);
    return(
        <addData.Provider  value={{udata,setUdata}}>
           <Register />
           <Homeuser />
        </addData.Provider >
    )
}

export default ContextProvider;