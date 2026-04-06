import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  // Check login status
  const isLoggedIn = !!localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <nav className="flex justify-between items-center px-8 py-4 bg-white/10 backdrop-blur-lg border-b border-white/20 text-white">

      {/* Logo */}
      <h1
        onClick={() => navigate("/")}
        className="text-2xl font-bold cursor-pointer"
      >
        <span className="bg-gradient-to-r from-indigo-400 to-purple-500 bg-clip-text text-transparent">
          IntervU
        </span>
      </h1>

      {/* Right Side */}
      <div className="flex items-center gap-4">

        {!isLoggedIn ? (
          <>
            <button
              onClick={() => navigate("/login")}
              className="px-5 py-2 rounded-lg border text-black border-gray-400 hover:bg-white transition"
            >
              Login
            </button>

            <button
              onClick={() => navigate("/signup")}
              className="px-5 py-2 rounded-lg bg-indigo-500 hover:bg-indigo-600 transition shadow-lg"
            >
              Sign Up
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => navigate("/dashboard")}
              className="px-5 py-2 rounded-lg hover:bg-white text-black transition"
            >
              Home
            </button>

            <button
              onClick={handleLogout}
              className="px-5 py-2 rounded-lg bg-red-500 hover:bg-red-600 transition"
            >
              Logout
            </button>
          </>
        )}

      </div>
    </nav>
  );
};

export default Navbar;