import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="
        bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900
        border-t border-indigo-500/20
      "
    >
      <div className="max-w-5xl mx-auto px-6 py-10 text-center">

        {/* Logo */}
        <h2 className="text-xl font-semibold text-white mb-2">
          Interv<span className="text-indigo-400">U</span>
        </h2>

        {/* Tagline */}
        <p className="text-gray-400 text-sm mb-6">
          Crack interviews smarter with AI 🚀
        </p>

        {/* Links */}
        <div className="flex justify-center gap-6 text-sm mb-6">
          <Link to="/" className="text-gray-400 hover:text-indigo-400 transition">
            Home
          </Link>
          
        </div>

        {/* Divider */}
        <div className="border-t border-indigo-500/20 mb-4"></div>

        {/* Bottom */}
        <p className="text-xs text-gray-500">
          © 2026 IntervU • Built with ❤️ for developers
        </p>

      </div>
    </motion.footer>
  );
};

export default Footer;