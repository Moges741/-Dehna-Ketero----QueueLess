import React from 'react'
import { Routes, Route } from 'react-router-dom'
import NavBar from './components/common/navBar/NavBar'
import Hero from './components/landing/Hero.jsx'
import Login from './features/auth/Login.jsx'
import Register from './features/auth/Register.jsx'
import CreateTicket from './features/ticket/CreateTicket.jsx'
import Offices from './features/office/Offices.jsx'

const Landing = () => {
  return (
    <div>
      <NavBar/>
      <Routes>
        <Route path="/" element={<Hero/>} />
        <Route path="/create-ticket" element={<CreateTicket/>} />
        <Route path="offices" element={<Offices/>} />
        <Route path="/login" element={<Login/>} />
        <Route path='/register' element={<Register/>}/>
      </Routes>
    </div>
  )
}

export default Landing
