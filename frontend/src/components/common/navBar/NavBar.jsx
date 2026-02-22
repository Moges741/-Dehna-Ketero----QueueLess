import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from "../../../features/auth/authSlice";
import styles from "./navbar.module.css";

const NavBar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();


  const { user, token } = useSelector((state) => state.auth);

  const displayName = user?.name || localStorage.getItem("userName") || "Guest";
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
    navigate("/");
  };

  useEffect(() => {
    if (user?.name) {
      localStorage.setItem("userName", user.name);
    }
  }, [user]);

  return (
    <nav className={`w-full fixed top-0 left-0 z-50 ${styles.navGlass}`}>
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link to="/" className="text-2xl font-bold tracking-wide">
            Queue<span className="text-green-500">Less</span>
          </Link>
        </div>

        <div className="hidden md:flex gap-10 font-medium text-sm">
          <a href="#how" className="hover:text-green-500 transition">How It Works</a>
          <Link to="/offices" className="hover:text-green-500 transition">Offices</Link>
          <Link to="/services" className="hover:text-green-500 transition">Services</Link>
          <Link to="/queue" className="hover:text-green-500 transition">Live Queue</Link>
        </div>

        <div className="flex gap-3 items-center">
          {!token ? (
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
                <Link
                  to="/profile" 
                  className="block px-5 py-3 text-sm text-gray-700 hover:bg-gray-50 transition"
                >
                  Profile
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
    </nav>
  );
};

export default NavBar;