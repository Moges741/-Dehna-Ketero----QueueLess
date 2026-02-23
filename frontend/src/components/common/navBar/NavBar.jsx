import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from "../../../features/auth/authSlice";
import styles from "./navbar.module.css";

const NavBar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, token } = useSelector((state) => state.auth);

  const [isOpen, setIsOpen] = useState(false);

  const displayName = user?.name || localStorage.getItem("userName") || "Guest";
  const role = user?.role || localStorage.getItem("userRole");

  const firstName = displayName.split(" ")[0];
  const initials = displayName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem("token");
    localStorage.removeItem("userName");
    localStorage.removeItem("userRole");
    navigate("/");
  };

  useEffect(() => {
    if (user?.name) {
      localStorage.setItem("userName", user.name);
      localStorage.setItem("userRole", user.role);
    }
  }, [user]);

  return (
    <nav className={`w-full fixed top-0 left-0 z-50 ${styles.navGlass}`}>
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold tracking-wide">
          Queue<span className="text-green-500">Less</span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-10 font-medium text-sm">
          <Link to="/how-it-works" className="hover:text-green-500 transition">
            How It Works
          </Link>

          {/* Admin Only Links */}
          {role === "admin" && (
            <>
              <Link to="/offices" className="hover:text-green-500 transition">
                Offices
              </Link>
              <Link to="/services" className="hover:text-green-500 transition">
                Services
              </Link>
              <Link to="/queue" className="hover:text-green-500 transition">
                Live Queue
              </Link>
              <Link to="/dashboard" className="hover:text-green-500 transition">
                Dashboard
              </Link>
            </>
          )}
        </div>

        {/* Right Section */}
       {/* Right Section */}
<div className="flex items-center gap-3">
  
  {/* Mobile Toggle */}
  <button
    onClick={() => setIsOpen(!isOpen)}
    className="md:hidden text-gray-800 focus:outline-none"
  >
    ☰
  </button>

  {!user ? (  // <-- check for user object, not token
    <>
      <Link to="/login" className="px-4 py-2 text-sm font-medium hover:text-green-500 transition">
        Login
      </Link>
      <Link
        to="/register"
        className="px-5 py-2 rounded-xl bg-green-500 text-white text-sm font-medium hover:bg-green-600 transition shadow"
      >
        Register
      </Link>
    </>
  ) : (
    <div className="relative group">
      <button className="flex items-center gap-3 focus:outline-none">
        <div className="w-9 h-9 rounded-full bg-green-600 text-white flex items-center justify-center font-semibold text-sm shadow">
          {initials}
        </div>
        <span className="text-sm font-medium text-gray-800 hidden sm:block">
          Hi, {firstName}
        </span>
      </button>

      <div className="absolute right-0 mt-3 w-48 bg-white rounded-xl shadow-xl py-2 z-50 opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition-all duration-200 border border-gray-100">
        <Link
          to="/dashboard"
          className="block px-5 py-3 text-sm text-gray-700 hover:bg-gray-50 transition"
        >
          Dashboard
        </Link>
        <button
          onClick={handleLogout}
          className="w-full text-left px-5 py-3 text-sm text-red-600 hover:bg-red-50 transition"
        >
          Logout
        </button>
      </div>
    </div>
  )}
</div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white shadow-md px-6 py-4 space-y-4">
          <Link to="/how-it-works" className="block hover:text-green-500">
            How It Works
          </Link>

          {role === "admin" && (
            <>
              <Link to="/offices" className="block hover:text-green-500">
                Offices
              </Link>
              <Link to="/services" className="block hover:text-green-500">
                Services
              </Link>
              <Link to="/queue" className="block hover:text-green-500">
                Live Queue
              </Link>
              <Link to="/dashboard" className="block hover:text-green-500">
                Dashboard
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default NavBar;