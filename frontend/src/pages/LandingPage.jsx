import { useNavigate } from "react-router-dom";
import { FaRobot, FaChartLine, FaUserCheck } from "react-icons/fa";
import { motion } from "framer-motion";

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-800 text-white flex flex-col">



      {/* Hero Section */}
      <div className="flex flex-col md:flex-row items-center justify-between px-10 py-16 flex-grow">

        {/* Left Content */}
        <motion.div
          initial={{ x: -80, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="max-w-xl"
        >
          <h1 className="text-5xl font-bold leading-tight mb-6">
            Crack Interviews with{" "}
            <span className="text-indigo-400">AI Power</span>
          </h1>

          <p className="text-gray-300 text-lg mb-8">
            Practice real interview questions, get instant feedback, and track your growth
            with our smart AI interview system.
          </p>

          <div className="flex gap-4">
            <button
              onClick={() => navigate("/login")}
              className="bg-indigo-500 px-8 py-3 rounded-lg text-lg hover:bg-indigo-600 transition shadow-lg"
            >
              Get Started 🚀
            </button>

            <button className="border border-gray-400 px-8 py-3 rounded-lg hover:bg-white hover:text-black transition">
              Learn More
            </button>
          </div>
        </motion.div>

        {/* Right Card Animation */}
        <motion.div
          initial={{ x: 80, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="mt-10 md:mt-0"
        >
          <div className="bg-white/10 backdrop-blur-lg p-8 rounded-2xl shadow-2xl w-[300px]">
            <h3 className="text-xl font-semibold mb-4 text-indigo-300">
              Live AI Feedback
            </h3>
            <p className="text-gray-300 text-sm">
              “Your answer was good, but could be more structured using STAR method.”
            </p>
          </div>
        </motion.div>
      </div>

      {/* Features Section */}
      <div className="grid md:grid-cols-3 gap-6 px-10 pb-16">

        {[
          { icon: <FaRobot />, title: "AI Interviews", desc: "Real-time mock interviews powered by AI." },
          { icon: <FaChartLine />, title: "Track Progress", desc: "Detailed analytics to improve performance." },
          { icon: <FaUserCheck />, title: "Smart Feedback", desc: "Personalized suggestions for every answer." }
        ].map((item, index) => (
          <motion.div
            key={index}
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: index * 0.2, duration: 0.6 }}
            className="bg-white/10 backdrop-blur-lg p-6 rounded-xl hover:scale-105 transition"
          >
            <div className="text-indigo-400 text-3xl mb-3">{item.icon}</div>
            <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
            <p className="text-gray-300 text-sm">{item.desc}</p>
          </motion.div>
        ))}

      </div>

      
    </div>
  );
};

export default LandingPage;