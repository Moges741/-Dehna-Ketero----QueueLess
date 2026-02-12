import React from 'react'
import styles from "./navbar.module.css";

const NavBar = () => {
  return (
  <nav className={`w-full fixed top-0 left-0 z-50 ${styles.navGlass}`}>
    <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        LOGO
        <div className="text-2xl font-bold tracking-wide">
            Queue<span className="text-green-500">Less</span>
        </div>
        <div className="hidden md:flex gap-10 font-medium text-sm">
            <a href="#how" className="hover:text-green-500 transition">How It Works</a>
            <a href="#offices" className="hover:text-green-500 transition">Offices</a>
            <a href="#services" className="hover:text-green-500 transition">Services</a>
        </div>
        <div className="flex gap-3 items-center">
            <button className="px-4 py-2 text-sm font-medium hover:text-green-500 transition">Login</button>
            <button className="px-5 py-2 rounded-xl bg-green-500 text-white text-sm font-medium hover:bg-green-600 transition shadow">Register</button>
        </div>
    </div>
  </nav>
  )
}

export default NavBar
