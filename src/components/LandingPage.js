import React from "react";
import AboutSection from "./AboutSection";
import ChatbotIcon from "./ChatbotIcon";

const LandingPage = () => {
  return (
    <div className="min-h-[calc(100vh-64px)] bg-white">

      {/* About Section */}
      <AboutSection />

      {/* Chatbot */}
      <ChatbotIcon />
    </div>
  );
};

export default LandingPage;
