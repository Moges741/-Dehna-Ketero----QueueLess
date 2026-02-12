import styles from "./auth.module.css";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "./authSlice.js";   // adjust path
import { useNavigate, Link } from "react-router-dom";
import { useEffect } from "react";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, error, successMsg } = useSelector((state) => state.auth);

  const [form, setForm] = useState({
    name: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser(form));
  };

  const handleGoogleLogin = () => {
    console.log("Google Login Click");
    // window.location.href = BACKEND_GOOGLE_AUTH_URL
  };

  useEffect(() => {
    if (successMsg) {
      setTimeout(() => {
        navigate("/dashboard");        // Change route as needed
      }, 1500);
    }
  }, [successMsg, navigate]);

  return (
    <div className="min-h-screen grid md:grid-cols-2">
      {/* LEFT HERO - unchanged */}
      <div className={`${styles.authBg} hidden md:flex relative`}>
        <div className={`absolute inset-0 ${styles.darkOverlay}`} />
        <div className="relative z-10 p-16 flex flex-col justify-end text-white">
          <h1 className="text-5xl font-bold leading-tight">Welcome Back</h1>
          <p className="mt-4 text-gray-300 max-w-md">
            Skip waiting lines. Access your tickets and manage services instantly.
          </p>
        </div>
      </div>

      {/* RIGHT FORM */}
      <div className="flex items-center justify-center p-8 bg-gray-50">
        <div className={`w-full max-w-md rounded-3xl shadow-xl p-10 ${styles.glassCard}`}>

          <h2 className="text-3xl font-bold text-gray-800">Log In</h2>

          {/* Error Message */}
          {error && (
            <div className="mt-4 p-3 bg-red-100 text-red-700 rounded-xl text-sm">
              {error}
            </div>
          )}

          {/* Success Message */}
          {successMsg && (
            <div className="mt-4 p-3 bg-green-100 text-green-700 rounded-xl text-sm">
              {successMsg}
            </div>
          )}

          {/* Google Login */}
          <button
            onClick={handleGoogleLogin}
            className="w-full mt-6 flex items-center justify-center gap-3 border rounded-xl py-3 hover:bg-gray-100 transition"
          >
            <img src="https://www.svgrepo.com/show/475656/google-color.svg" className="w-5 h-5" />
            Continue with Google
          </button>

          <div className="flex items-center gap-3 my-6">
            <div className="flex-1 h-px bg-gray-300" />
            <span className="text-sm text-gray-500">OR</span>
            <div className="flex-1 h-px bg-gray-300" />
          </div>

          {/* FORM */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <input
              name="name"
              placeholder="Username"
              onChange={handleChange}
              className="w-full p-3 rounded-xl border focus:ring-2 focus:ring-green-400 outline-none"
            />

            <input
              name="password"
              type="password"
              placeholder="Password"
              onChange={handleChange}
              className="w-full p-3 rounded-xl border focus:ring-2 focus:ring-green-400 outline-none"
            />

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-green-500 text-white py-3 rounded-xl font-semibold hover:bg-green-600 transition flex items-center justify-center disabled:opacity-70"
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin h-5 w-5 mr-3 text-white" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
                  </svg>
                  Logging in...
                </>
              ) : (
                "Log In"
              )}
            </button>
          <Link className="text-center font-bold ml-[100px] hover:text-green-500" to="/register">Create New Account</Link>

          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;