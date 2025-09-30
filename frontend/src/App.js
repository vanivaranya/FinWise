import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Layout from "./components/Layout";
import LandingPage from "./components/LandingPage";
import SavingsPage from "./components/SavingsPage";
import ExpensesPage from "./components/ExpensesPage";
import StatsPage from "./components/StatsPage";
import HelpPage from "./components/HelpPage";
import LoginPage from "./components/LoginPage";
import SignupPage from "./components/SignupPage";
import RequireAuth from "./components/RequireAuth";

function App() {
  return (
    <Router>
      <ToastContainer position="top-right" autoClose={3000} theme="colored" />
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />

          {/* Protected Routes */}
          <Route
            path="/savings"
            element={
              <RequireAuth>
                <SavingsPage />
              </RequireAuth>
            }
          />
          <Route
            path="/expenses"
            element={
              <RequireAuth>
                <ExpensesPage />
              </RequireAuth>
            }
          />
          <Route
            path="/stats"
            element={
              <RequireAuth>
                <StatsPage />
              </RequireAuth>
            }
          />
          <Route
            path="/help"
            element={
              <HelpPage />
            }
          />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;