import React from "react";
import { MessageCircle } from "lucide-react";

const ChatbotIcon = () => {
  return (
    <div className="fixed bottom-6 right-6">
      <button className="bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition">
        <MessageCircle className="w-6 h-6" />
      </button>
    </div>
  );
};

export default ChatbotIcon;
