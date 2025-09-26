import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="flex justify-between items-center px-8 py-4 bg-blue-900 shadow-md">
      {/* Logo */}
      <div className="flex items-center space-x-2">
        <img src="/images/logo.png" alt="FinWise Logo" className="h-10 w-10 rounded-full" />
        <Link to="/" className="text-xl font-bold text-white">FinWise</Link>
      </div>

      {/* Menu */}
      <div className="flex space-x-6 text-white font-medium">
        <Link to="/savings" className="hover:text-blue-300">Savings</Link>
        <Link to="/expenses" className="hover:text-blue-300">Expenses</Link>
        <Link to="/stats" className="hover:text-blue-300">Stats</Link>
        <Link to="/help" className="hover:text-blue-300">Help</Link>
        <Link to="/login" className="hover:text-blue-300">Login</Link>
      </div>
    </nav>
  );
};

export default Navbar;
