import React from 'react'
import { Routes, Route } from 'react-router-dom'
import NavBar from './components/common/navBar/NavBar'
import Login from './features/auth/Login.jsx'
import Register from './features/auth/Register.jsx'
import TicketQueue from './features/ticket/TicketQueue.jsx'
import Offices from './features/office/Offices.jsx'
import Services from './features/service/Services.jsx'
import Dashboard from './pages/Dashboard.jsx'
import Home from './components/common/Home/Home.jsx'
import HowItWorks from './components/common/HowItWorks/HowItWorks.jsx'
import QueueManagement from './features/queue/QueueManagement.jsx'

const Landing = () => {
  return (
    <div>
      <NavBar/>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/create-ticket" element={<TicketQueue/>} />
        <Route path="offices" element={<Offices/>} />
        <Route path='/services' element={<Services/>}/>
        <Route path='/queue' element={<QueueManagement/>}/>
        <Route path="/login" element={<Login/>} />
        <Route path='/register' element={<Register/>}/>
        <Route path='/dashboard' element={<Dashboard  />}/>
        <Route path='/how-it-works' element={<HowItWorks/>}/>
      </Routes>
      
    </div>
  )
}

export default Landing
