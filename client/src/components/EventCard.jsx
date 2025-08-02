import React from 'react';

const EventCard = ({ event }) => {
  return (
    <div className="relative flex flex-col items-center justify-center p-6 rounded-2xl shadow-xl backdrop-blur-lg bg-white/10 border border-white/20 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 hover:scale-105 overflow-hidden">
      {/* Floating Glow Effect */}
      <div className="absolute -top-8 left-1/2 -translate-x-1/2 w-24 h-24 bg-purple-500 opacity-30 blur-3xl"></div>

      {/* Event Title */}
      <h3 className="text-2xl font-semibold text-white tracking-wide drop-shadow-md text-center">
        {event}
      </h3>

      {/* Description */}
      <p className="text-gray-300 text-sm mt-3 px-6 text-center">
        Experience an unforgettable event crafted just for you.
      </p>

      {/* Button */}
      <button className="mt-5 px-6 py-2 bg-gradient-to-r from-purple-500 to-indigo-600 text-white font-medium rounded-xl hover:from-purple-600 hover:to-indigo-700 transition-all duration-300 shadow-lg hover:shadow-xl">
        View Event
      </button>

      {/* Decorative Gradients */}
      <div className="absolute -bottom-8 left-1/3 w-24 h-24 bg-indigo-500 opacity-20 blur-3xl"></div>
    </div>
  );
};

export default EventCard;
