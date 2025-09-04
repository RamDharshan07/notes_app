import React from 'react'
import SignUp from './pages/SignUp'
import Home from './pages/Home'
import Login from './pages/Login'
import {BrowserRouter,Routes,Route} from "react-router-dom"
const App = () => {
  return (
    <div className=''>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/register" element={<SignUp/>}/>
        <Route path="/login" element={<Login/>}/>
      </Routes>
      </BrowserRouter>

      
    </div>
  )
}

export default App
