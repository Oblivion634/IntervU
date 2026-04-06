import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { API_PATHS } from "../utils/apiPaths";
import axios from "../utils/axiosInstance";
import { motion } from "framer-motion";

const SignUp = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleSignup = async () => {
    try {
      await axios.post(API_PATHS.AUTH.SIGNUP, form);
      navigate("/login");
    } catch (error) {
      console.log(error.response);
      alert("Signup failed");
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
          Create Account 🚀
        </h2>
        <p className="text-gray-300 text-center mb-6 text-sm">
          Start your AI-powered interview preparation
        </p>

        {/* Name */}
        <input
          type="text"
          placeholder="Enter your name"
          className="w-full bg-white/10 border border-gray-400/30 text-white placeholder-gray-400 rounded-lg p-3 mb-4 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />

        {/* Email */}
        <input
          type="email"
          placeholder="Enter your email"
          className="w-full bg-white/10 border border-gray-400/30 text-white placeholder-gray-400 rounded-lg p-3 mb-4 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />

        {/* Password */}
        <input
          type="password"
          placeholder="Create a password"
          className="w-full bg-white/10 border border-gray-400/30 text-white placeholder-gray-400 rounded-lg p-3 mb-4 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />

        {/* Button */}
        <button
          onClick={handleSignup}
          className="w-full bg-indigo-500 text-white py-3 rounded-lg hover:bg-indigo-600 transition duration-200 shadow-lg"
        >
          Sign Up 🚀
        </button>

        {/* Divider */}
        <div className="flex items-center my-5">
          <div className="flex-1 h-[1px] bg-gray-500/30"></div>
          <p className="px-3 text-gray-400 text-sm">OR</p>
          <div className="flex-1 h-[1px] bg-gray-500/30"></div>
        </div>

        {/* Login Link */}
        <p className="text-center text-sm text-gray-300">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-indigo-400 font-medium hover:underline"
          >
            Login
          </Link>
        </p>

      </motion.div>
    </div>
  );
};

export default SignUp;