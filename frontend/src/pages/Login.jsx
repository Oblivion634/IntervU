import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { API_PATHS } from "../utils/apiPaths";
import { motion } from "framer-motion";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleForm = (e) => {
    let { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleLogin = async () => {
    try {
      const res = await axios.post(API_PATHS.AUTH.LOGIN, form);
      localStorage.setItem("token", res.data.token);
      navigate("/dashboard");
    } catch (error) {
      alert("Invalid email and password");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-800 px-4">

      {/* Glass Card */}
      <motion.div
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md bg-white/10 backdrop-blur-lg p-8 rounded-2xl shadow-2xl border border-white/20"
      >

        {/* Logo */}
        <h1 className="text-2xl font-bold text-center mb-2">
          <span className="bg-gradient-to-r from-indigo-400 to-purple-500 bg-clip-text text-transparent">
            IntervU
          </span>
        </h1>

        {/* Heading */}
        <h2 className="text-xl font-semibold text-center mb-1 text-white">
          Welcome Back 👋
        </h2>
        <p className="text-gray-300 text-center mb-6 text-sm">
          Login to continue your interview preparation
        </p>

        {/* Email */}
        <input
          type="email"
          name="email"
          placeholder="Enter your email"
          className="w-full bg-white/10 border border-gray-400/30 text-white placeholder-gray-400 rounded-lg p-3 mb-4 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          onChange={handleForm}
        />

        {/* Password */}
        <input
          type="password"
          name="password"
          placeholder="Enter your password"
          className="w-full bg-white/10 border border-gray-400/30 text-white placeholder-gray-400 rounded-lg p-3 mb-4 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          onChange={handleForm}
        />

        {/* Button */}
        <button
          onClick={handleLogin}
          className="w-full bg-indigo-500 text-white py-3 rounded-lg hover:bg-indigo-600 transition duration-200 shadow-lg"
        >
          Login 🚀
        </button>

        {/* Divider */}
        <div className="flex items-center my-5">
          <div className="flex-1 h-[1px] bg-gray-500/30"></div>
          <p className="px-3 text-gray-400 text-sm">OR</p>
          <div className="flex-1 h-[1px] bg-gray-500/30"></div>
        </div>

        {/* Signup Link */}
        <p className="text-center text-sm text-gray-300">
          Don’t have an account?{" "}
          <Link
            to="/signup"
            className="text-indigo-400 font-medium hover:underline"
          >
            Sign Up
          </Link>
        </p>

      </motion.div>
    </div>
  );
};

export default Login;