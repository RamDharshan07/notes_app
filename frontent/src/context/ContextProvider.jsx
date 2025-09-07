import axios from 'axios';
import React, { createContext, useContext, useEffect, useState } from 'react'

const authContext=createContext();

const ContextProvider = ({children}) => {
    const [user,setUser]=useState(null);
    const login=(user)=>{
        setUser(user);
    }
     const Logout=()=>{
        localStorage.removeItem('token')
        setUser(null);
      }
    useEffect(()=>{
      const verifyuser=async()=>{
        try{
          const res=await axios.get('http://localhost:5000/api/auth/verify',{
            headers:{
              Authorization:`Bearer ${localStorage.getItem("token")}`,
            }
          })
          if(res.data.success)
          {
            setUser(res.data.user)
          }
          else{
            setUser(null)
          }
        }
        catch(err)
        {
          console.log(err);
          
        }
      }
      verifyuser();
    },[])
  return (
    
        <authContext.Provider value={{user,login,Logout}}>
          {children}
        </authContext.Provider>
      
    
  )
}

export const useAuth=()=>useContext(authContext);
export default ContextProvider
