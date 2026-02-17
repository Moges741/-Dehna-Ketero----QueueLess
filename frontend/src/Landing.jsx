import React from 'react'
import { Routes, Route } from 'react-router-dom'
import NavBar from './components/common/navBar/NavBar'
import Hero from './components/landing/Hero.jsx'
import Login from './features/auth/Login.jsx'
import Register from './features/auth/Register.jsx'
import TicketQueue from './features/ticket/TicketQueue.jsx'
import Offices from './features/office/Offices.jsx'
import Services from './features/service/Services.jsx'

const Landing = () => {
  return (
    <div>
      <NavBar/>
      <Routes>
        <Route path="/" element={<Hero/>} />
        <Route path="/create-ticket" element={<TicketQueue/>} />
        <Route path="offices" element={<Offices/>} />
        <Route path='/services' element={<Services/>}/>
        <Route path='/queue' element={<TicketQueue/>}/>
        <Route path="/login" element={<Login/>} />
        <Route path='/register' element={<Register/>}/>
      </Routes>
    </div>
  )
}

export default Landing
