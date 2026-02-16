import React from 'react'
import styles from "./hero.module.css";
import { Link } from 'react-router-dom';


const Hero = () => {
  return (
    <section className={`${styles.heroBg} min-h-screen flex items-center`}>
        <div className={styles.overlay} ></div>
        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-6">
<div className="max-w-2xl">
    <h1 className="text-5xl md:text-6xl font-bold text-white leading-tight">Smart Queue <br />
    <span className="text-green-400">Management</span> for Everyday Services</h1>
    <p className="mt-6 text-lg text-gray-200 leading-relaxed">
        Skip long waiting lines. Book your service ticket online,
            track your turn in real time, and arrive exactly when needed.
    </p>
    {/* CTA Buttons */}
    <div className="mt-8 flex gap-4">
           <button className="px-8 py-4 bg-green-500 text-white rounded-xl font-semibold hover:bg-green-600 transition shadow-lg">
              <Link to="/create-ticket">Get Ticket</Link>
            </button>

            <button className="px-8 py-4 bg-white/20 backdrop-blur-md text-white rounded-xl font-semibold hover:bg-white/30 transition">
              Learn More
            </button>
    </div>
       {/* Stats (Product Feel) */}
          <div className="mt-12 flex gap-10 text-white">
            <div>
              <p className="text-3xl font-bold">20+</p>
              <p className="text-sm text-gray-300">Offices Connected</p>
            </div>

            <div>
              <p className="text-3xl font-bold">5K+</p>
              <p className="text-sm text-gray-300">Tickets Processed</p>
            </div>

            <div>
              <p className="text-3xl font-bold">99%</p>
              <p className="text-sm text-gray-300">Time Saved</p>
            </div>
          </div>

</div>
        </div>
      
    </section>
  )
}

export default Hero
