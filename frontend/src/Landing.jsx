import React from 'react'
import { Routes, Route } from 'react-router-dom'
import NavBar from './components/common/navBar/NavBar'
import Hero from './components/landing/Hero.jsx'
import Login from './features/auth/Login.jsx'
import Register from './features/auth/Register.jsx'

const Landing = () => {
  return (
    <div>
      <NavBar/>
      <Routes>
        <Route path="/" element={<Hero/>} />
        <Route path="/login" element={<Login/>} />
        <Route path='/register' element={<Register/>}/>
      </Routes>
    </div>
  )
}

export default Landing
