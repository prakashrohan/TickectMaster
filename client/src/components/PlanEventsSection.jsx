import React from "react";

const Progress = ({ value, color }) => {
  return (
    <div className="w-full bg-gray-200 h-3 rounded-full overflow-hidden">
      <div className={`h-3 rounded-full transition-all duration-300 ${color}`} style={{ width: `${value}%` }} />
    </div>
  );
};

const PlanEventsSection = () => {
  return (
    <section className="w-full mx-auto px-6 py-12 px-8">
      <div className="bg-gradient-to-r from-purple-700 to-indigo-600 p-10 h-[60vh] rounded-3xl shadow-xl flex flex-col md:flex-row items-center md:items-stretch overflow-hidden relative">
        
        {/* Left Side: Image */}
        <div className="w-full md:w-1/2 rounded-3xl overflow-hidden relative">
          <img
            src="/audience.avif" // Replace with your image URL
            alt="Audience clapping"
            className="object-cover w-full h-full rounded-xl"
          />
        </div>
        

            <div className="w-full md:w-1/2 bg-white bg-opacity-30 backdrop-filter backdrop-blur-lg rounded-3xl p-8 md:p-12 shadow-lg md:ml-8 mt-8 md:mt-0 flex flex-col justify-center relative">
              
              {/* Tagline */}
          <p className="text-sm font-medium text-purple-600 uppercase mb-2">Exclusive Event Management</p>
          
          {/* Title */}
          <h2 className="text-4xl font-extrabold text-gray-900 leading-tight mb-4">
            Plan Your Events with Us
          </h2>
          
          {/* Description */}
          <p className="text-gray-600 text-lg mb-6">
            We specialize in creating memorable experiences with seamless event planning, marketing, and social media strategies.
          </p>
          
          {/* Progress Bars */}
          <div className="space-y-5">
            <div>
              <div className="flex justify-between text-gray-800 font-semibold mb-1">
                <span>Marketing</span>
                <span>70%</span>
              </div>
              <Progress value={70} color="bg-pink-500" />
            </div>
            <div>
              <div className="flex justify-between text-gray-800 font-semibold mb-1">
                <span>Management</span>
                <span>80%</span>
              </div>
              <Progress value={80} color="bg-yellow-400" />
            </div>
            <div>
              <div className="flex justify-between text-gray-800 font-semibold mb-1">
                <span>Social Media</span>
                <span>90%</span>
              </div>
              <Progress value={90} color="bg-green-500" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PlanEventsSection;
