import React, { useState, useEffect } from 'react';
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
  const role = user?.role || localStorage.getItem("userRole") || "user"; // fallback to "user"

  const firstName = displayName.split(" ")[0];
  const initials = displayName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  const isAdminOrStaff = ["admin", "manager", "staff"].includes(role);

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
      
        <Link to="/" className="text-2xl font-bold tracking-wide">
          Queue<span className="text-green-500">Less</span>
        </Link>

        <div className="hidden md:flex gap-10 font-medium text-sm">
          <Link to="/how-it-works" className="hover:text-green-500 transition">
            How It Works
          </Link>

          {isAdminOrStaff && (
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
            </>
          )}

          {token && (
            <Link to="/dashboard" className="hover:text-green-500 transition">
              Dashboard
            </Link>
          )}
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-gray-800 focus:outline-none"
          >
            ☰
          </button>

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
                <div className="ml-2"><button onClick={handleLogout} className="text-red-600 hover:text-red-700 text-sm">Logout</button></div>
              </button> 

             
            </div>
          )}
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-white shadow-md px-6 py-4 space-y-4">
          <Link to="/how-it-works" className="block hover:text-green-500">
            How It Works
          </Link>

          {isAdminOrStaff && (
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
            </>
          )}

          {token && (
            <Link to="/dashboard" className="block hover:text-green-500">
              Dashboard
            </Link>
          )}

          {token && (
            <button
              onClick={handleLogout}
              className="block w-full text-left text-red-600 hover:text-red-700"
            >
              Logout
            </button>
          )}
        </div>
      )}
    </nav>
  );
};

export default NavBar;