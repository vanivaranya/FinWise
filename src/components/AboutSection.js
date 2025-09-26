import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const About = () => {
  return (
    <section className="flex flex-col md:flex-row items-center justify-between px-8 py-16 bg-gray-200">
      {/* Left image */}
      <div className="w-full md:w-1/3 flex justify-center">
        <img
          src="/images/about.jpg"
          alt="About FinWise"
          className="rounded-2xl shadow-lg h-96 object-cover"
        />
      </div>

      {/* Right text */}
      <div className="w-full md:w-2/3 md:pl-12 mt-8 md:mt-0">
        <h2 className="text-3xl font-bold text-blue-900 mb-4">About FinWise</h2>
        <p className="text-gray-700 mb-4">
          Managing finances can often feel overwhelming, especially when you’re
          trying to balance savings, expenses, and budgets at the same time.
          FinWise brings all these aspects together in one simple, intuitive
          platform. With clear visual analytics and real-time insights, you’ll
          always know where your money is going. Our goal is to make financial
          planning less stressful and more effective.
        </p>
        <p className="text-blue-900 font-semibold italic">
          “Plan smarter, spend wiser.”
        </p>

        {/* Buttons */}
        <div className="flex space-x-4 mt-6">
          <Link
            to="/savings"
            className="flex items-center bg-blue-600 text-white px-6 py-3 rounded-xl shadow-md hover:bg-blue-700 transition"
          >
            Get Started <ArrowRight className="ml-2 w-5 h-5" />
          </Link>
          <Link
            to="/help"
            className="flex items-center border border-blue-600 text-blue-600 px-6 py-3 rounded-xl shadow-md hover:bg-blue-50 transition"
          >
            Learn More
          </Link>
        </div>
      </div>
    </section>
  );
};

export default About;
