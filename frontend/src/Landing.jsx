import React from 'react'
import { Routes, Route } from 'react-router-dom'
import NavBar from './components/common/navBar/NavBar'
import Hero from './components/landing/Hero.jsx'
import Login from './features/auth/Login.jsx'

const Landing = () => {
  return (
    <div>
      <NavBar/>
      <Routes>
        <Route path="/" element={<Hero/>} />
        <Route path="/login" element={<Login/>} />
      </Routes>
    </div>
  )
}

export default Landing
