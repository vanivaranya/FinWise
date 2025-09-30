import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${process.env.REACT_APP_API_BASE}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (res.ok) {
        localStorage.setItem("token", data.token);
        toast.success("Login successful!");
        navigate("/");
      } else {
        toast.error(data.message || "Login failed");
      }
    } catch (err) {
      toast.error("Server error. Please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-64px)] bg-blue-50">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md border border-blue-200">
        <h2 className="text-2xl font-bold text-center text-blue-800 mb-6">
          Login
        </h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-blue-700 mb-1">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full border border-blue-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
              required
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-blue-700 mb-1">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full border border-blue-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg shadow hover:bg-blue-700 transition"
          >
            Login
          </button>
        </form>

        {/* Extra */}
        <p className="text-sm text-center text-blue-600 mt-4">
          Don’t have an account?{" "}
          <span
            onClick={() => {
              toast.info("Redirecting to signup...");
              navigate("/signup");
            }}
            className="text-blue-800 font-medium cursor-pointer hover:underline"
          >
            Sign up
          </span>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;