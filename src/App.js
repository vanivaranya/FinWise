import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import LandingPage from "./components/LandingPage";
import SavingsPage from "./components/SavingsPage";
import ExpensesPage from "./components/ExpensesPage";
import LoginPage from "./components/LoginPage";



function App() {
  return (
    <Router>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<LandingPage />} />
          <Route path="/savings" element={<SavingsPage />} />
          <Route path="/expenses" element={<ExpensesPage />} />
          <Route path="/login" element={<LoginPage />} />

          {/* Add placeholders later */}
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
