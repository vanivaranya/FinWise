import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const SignupPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSignup = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch(`${process.env.REACT_APP_API_BASE}/api/auth/signup`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });
            const data = await res.json();
            if (res.ok) {
                localStorage.setItem("token", data.token);
                toast.success("Signup successful!");
                navigate("/");
            } else {
                toast.error(data.message || "Signup failed");
            }
        } catch (err) {
            toast.error("Server error. Please try again.");
        }
    };

    return (
        <div className="flex items-center justify-center min-h-[calc(100vh-64px)] bg-green-50">
            <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md border border-green-200">
                <h2 className="text-2xl font-bold text-center text-green-800 mb-6">
                    Sign Up
                </h2>
                <form onSubmit={handleSignup} className="space-y-5">
                    <div>
                        <label className="block text-sm font-medium text-green-700 mb-1">
                            Email
                        </label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your email"
                            className="w-full border border-green-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-400 focus:outline-none"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-green-700 mb-1">
                            Password
                        </label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Create a password"
                            className="w-full border border-green-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-400 focus:outline-none"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-green-600 text-white py-2 rounded-lg shadow hover:bg-green-700 transition"
                    >
                        Sign Up
                    </button>
                </form>
                <p className="text-sm text-center text-green-600 mt-4">
                    Already have an account?{" "}
                    <span
                        className="text-green-800 font-medium cursor-pointer hover:underline"
                        onClick={() => {
                            toast.info("Redirecting to login...");
                            navigate("/login");
                        }}
                    >
                        Login
                    </span>
                </p>
            </div>
        </div>
    );
};

export default SignupPage;