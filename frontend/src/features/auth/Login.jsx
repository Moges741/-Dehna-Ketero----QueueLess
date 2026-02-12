import { React, useState} from 'react'
import styles from "./auth.module.css";
const Login = () => {
    const [form, setForm]  =useState({name: "", password: "",});
    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value});
    };

    const handleSubmit = (e) =>{
        e.preventDefault();
        console.log("Login Data : ", form);
            // dispatch(loginUser(form))

    }
      const handleGoogleLogin = () => {
    console.log("Google Login Click");
    // window.location.href = BACKEND_GOOGLE_AUTH_URL
  };
  return (
       <div className="min-h-screen grid md:grid-cols-2">
{/* left hero */}
      <div className={`${styles.authBg} hidden md:flex relative`}>
    <div className={`absolute inset-0 ${styles.darkOverlay}`} />
        <div className="relative z-10 p-16 flex flex-col justify-end text-white">
              <h1 className="text-5xl font-bold leading-tight">
            Welcome Back
          </h1>
          <p className="mt-4 text-gray-300 max-w-md">
            Skip waiting lines. Access your tickets and manage services instantly.
          </p>
</div>

</div>
<div className="flex items-center justify-center p-8 bg-gray-300">
    <div className={`w-full max-w-md rounded-3xl shadow-xl p-10 ${styles.glassCard}`}>
    <h2 className="text-3xl font-bold text-gray-800">Log In</h2>
    {/* Google Login */}
          <button
            onClick={handleGoogleLogin}
            className="w-full mt-6 flex items-center justify-center gap-3 border rounded-xl py-3 hover:bg-gray-100 transition"
          >
            <img
              src="https://www.svgrepo.com/show/475656/google-color.svg"
              className="w-5 h-5"
            />
            Continue with Google
          </button>
              <div className="flex items-center gap-3 my-6">
            <div className="flex-1 h-px bg-gray-300" />
            <span className="text-sm text-gray-500">OR</span>
            <div className="flex-1 h-px bg-gray-300" />
          </div>

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

            <button className="w-full bg-green-500 text-white py-3 rounded-xl font-semibold hover:bg-green-600 transition">
              Log In
            </button>
            </form>
</div>
</div>   
</div>
  )
}

export default Login
