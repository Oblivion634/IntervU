import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-800 text-white px-6">

      <div className="text-center max-w-lg">

        <h1 className="text-7xl font-extrabold text-indigo-400 mb-4">
          404
        </h1>

        <h2 className="text-2xl font-semibold mb-2">
          Page Not Found
        </h2>

        <p className="text-gray-300 mb-6">
          The page you're looking for doesn’t exist or has been moved.
        </p>

        <Link
          to="/"
          className="inline-block bg-indigo-500 hover:bg-indigo-600 transition px-6 py-3 rounded-lg font-medium shadow-lg"
        >
          Go Home
        </Link>

      </div>
    </div>
  );
};

export default NotFound;