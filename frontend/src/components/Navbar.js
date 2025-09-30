import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { UserCircle } from "lucide-react";

const Navbar = () => {
  const [user, setUser] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchUser = async () => {
      if (!token) return;
      try {
        const res = await fetch("/api/auth/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        setUser(data);
      } catch {
        setUser(null);
      }
    };
    fetchUser();
  }, [token]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
    toast.info("Logged out");
    navigate("/login");
  };

  const maskedEmail = user?.email?.split("@")[0] || "User";

  return (
    <nav className="flex justify-between items-center px-8 py-4 bg-blue-900 shadow-md">
      {/* Logo */}
      <div className="flex items-center space-x-2">
        <img src="/images/logo.png" alt="FinWise Logo" className="h-10 w-10 rounded-full" />
        <Link to="/" className="text-xl font-bold text-white">FinWise</Link>
      </div>

      {/* Menu */}
      <div className="flex space-x-6 text-white font-medium items-center relative">
        <Link to="/savings" className="hover:text-blue-300">Savings</Link>
        <Link to="/expenses" className="hover:text-blue-300">Expenses</Link>
        <Link to="/stats" className="hover:text-blue-300">Stats</Link>
        <Link to="/help" className="hover:text-blue-300">Help</Link>

        {user ? (
          <div className="relative">
            <button
              onClick={() => setShowDropdown(!showDropdown)}
              className="flex items-center space-x-2 hover:text-blue-300"
            >
              <UserCircle className="w-6 h-6 text-white" />
              <span className="text-sm">{maskedEmail}</span>
            </button>

            {showDropdown && (
              <div className="absolute right-0 mt-2 bg-white text-blue-900 rounded-lg shadow-lg w-48 z-10">
                <div className="px-4 py-2 border-b text-sm">
                  <strong>Email:</strong>
                  <div className="truncate">{user.email}</div>
                </div>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 hover:bg-blue-50 text-sm"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <Link
            to="/login"
            onClick={() => toast.info("Redirecting to login...")}
            className="hover:text-blue-300"
          >
            Login
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;