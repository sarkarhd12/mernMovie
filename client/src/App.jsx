import { useState } from 'react'
import Home from './home/Home'
import Login from './components/Login'
import { Route, Routes } from 'react-router-dom'
import SignUp from './components/SignUp'
import PlayList from './components/PlayList'

function App() {

  return (
    <>
    <Routes>
    <Route path="/login" element={<Login />}/>
    <Route path="/" element={<Home />}/>
    <Route path="/register" element={<SignUp />}/>
    <Route path="/playlist" element={< PlayList/>}/>
    
 

    </Routes>
    </>
  )
}

export default App
