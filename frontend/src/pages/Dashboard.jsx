import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { API_PATHS } from "../utils/apiPaths";
import axiosInstance from "../utils/axiosInstance";
import { motion } from "framer-motion";

const Dashboard = () => {
  const [sessions, setSessions] = useState([]);
  const [role, setRole] = useState("");
  const [experience, setExperience] = useState("");
  const navigate = useNavigate();

  const fetchSessions = async () => {
    try {
      const res = await axiosInstance.get(API_PATHS.SESSION.GET_ALL);
      setSessions(res.data.sessions);
    } catch (error) {
      console.log(error.response);
    }
  };

  const createSession = async () => {
    if (!role || !experience) return alert("Fill all fields");

    try {
      await axiosInstance.post(API_PATHS.SESSION.CREATE, {
        role,
        experience,
        questions: [],
      });
    } catch (error) {
      console.log(error.response);
    }

    setRole("");
    setExperience("");
    fetchSessions();
  };

  useEffect(() => {
    fetchSessions();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-800 text-white px-6 md:px-12 py-10">

      {/* Header */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="mb-10"
      >
        <h1 className="text-4xl font-bold">
          Welcome to <span className="text-indigo-400">IntervU</span>
        </h1>
        <p className="text-gray-300 mt-2">
          Manage and track your interview preparation sessions 🚀
        </p>
      </motion.div>

      {/* Create Session */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/10 backdrop-blur-lg p-6 rounded-2xl shadow-xl border border-white/20 mb-10"
      >
        <h2 className="text-lg font-semibold mb-4 text-indigo-300">
          Create New Session
        </h2>

        <div className="flex flex-col md:flex-row gap-4">
          <input
            placeholder="Frontend Developer"
            value={role}
            className="bg-white/10 border border-gray-400/30 text-white placeholder-gray-400 p-3 rounded-lg flex-1 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            onChange={(e) => setRole(e.target.value)}
          />

          <input
            placeholder="2 yrs"
            value={experience}
            className="bg-white/10 border border-gray-400/30 text-white placeholder-gray-400 p-3 rounded-lg w-full md:w-40 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            onChange={(e) => setExperience(e.target.value)}
          />

          <button
            onClick={createSession}
            className="bg-indigo-500 px-6 py-3 rounded-lg hover:bg-indigo-600 transition shadow-lg"
          >
            + Create
          </button>
        </div>
      </motion.div>

      {/* Sessions */}
      {sessions.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center text-gray-400 mt-20"
        >
          <p className="text-xl">No sessions yet 😕</p>
          <p className="text-sm mt-2">
            Create your first session to get started
          </p>
        </motion.div>
      ) : (
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
          {sessions.map((s, index) => (
            <motion.div
              key={s._id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              onClick={() => navigate(`/interview/${s._id}`)}
              className="bg-white/10 backdrop-blur-lg p-5 rounded-2xl border border-white/20 hover:scale-105 hover:shadow-2xl transition cursor-pointer"
            >
              <h2 className="font-semibold text-lg mb-2 text-indigo-300">
                {s.role}
              </h2>
              <p className="text-gray-300 text-sm">
                {s.experience} experience
              </p>

              <div className="mt-4 text-xs text-gray-400">
                Click to start →
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;