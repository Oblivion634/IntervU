import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { API_PATHS } from "../utils/apiPaths";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleForm = (e) => {
    let { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleLogin = async () => {
    const toastId = toast.loading("Logging in...");
    try {
      const res = await axios.post(API_PATHS.AUTH.LOGIN, form);
      localStorage.setItem("token", res.data.token);
      toast.success("Login successful 🚀", { id: toastId });
      setTimeout(() => {
        navigate("/dashboard");
      }, 500);
    } catch (error) {
      toast.error("Invalid email or password ❌", { id: toastId });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-800 px-4">
      <motion.div
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md bg-white/10 backdrop-blur-lg p-8 rounded-2xl shadow-2xl border border-white/20"
      >
        <h1 className="text-2xl font-bold text-center mb-2">
          <span className="bg-gradient-to-r from-indigo-400 to-purple-500 bg-clip-text text-transparent">
            IntervU
          </span>
        </h1>
        <h2 className="text-xl font-semibold text-center mb-1 text-white">
          Welcome Back 👋
        </h2>
        <p className="text-gray-300 text-center mb-6 text-sm">
          Login to continue your interview preparation
        </p>
        <input
          type="email"
          name="email"
          placeholder="Enter your email"
          className="w-full bg-white/10 border border-gray-400/30 text-white placeholder-gray-400 rounded-lg p-3 mb-4 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          onChange={handleForm}
        />
        <input
          type="password"
          name="password"
          placeholder="Enter your password"
          className="w-full bg-white/10 border border-gray-400/30 text-white placeholder-gray-400 rounded-lg p-3 mb-4 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          onChange={handleForm}
        />
        <button
          onClick={handleLogin}
          className="w-full bg-indigo-500 text-white py-3 rounded-lg hover:bg-indigo-600 transition duration-200 shadow-lg"
        >
          Login 🚀
        </button>
        <div className="flex items-center my-5">
          <div className="flex-1 h-[1px] bg-gray-500/30"></div>
          <p className="px-3 text-gray-400 text-sm">OR</p>
          <div className="flex-1 h-[1px] bg-gray-500/30"></div>
        </div>
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