import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const features = [
  {
    icon: "🎤",
    title: "Live Performances",
    description: "Experience top-notch live shows, concerts, and entertainment events like never before.",
  },
  {
    icon: "🎟️",
    title: "Easy Ticketing",
    description: "Book, resell, or transfer event tickets effortlessly through our secure platform.",
  },
  {
    icon: "🔍",
    title: "Event Discovery",
    description: "Get personalized recommendations and find events based on your preferences.",
  },
  {
    icon: "💰",
    title: "Crypto Payments",
    description: "Enjoy secure and seamless event transactions using cryptocurrency.",
  },
];

const EventFeatures = () => {
  return (
    <section className="container mx-auto px-6 py-20 flex flex-col lg:flex-row items-center gap-12">
      {/* Left Side - Heading & Description */}
      <div className="max-w-lg text-center lg:text-left">
        <h2 className="text-4xl font-extrabold text-white">
          We Bring the Best <span className="text-purple-400">Event Features</span> for You
        </h2>
        <p className="text-gray-300 mt-4">
          Discover the most seamless event experiences with powerful features that enhance booking, networking, and convenience.
        </p>
        <button className="mt-6 bg-purple-600 hover:bg-purple-500 text-white px-6 py-3 rounded-lg transition">
          <Link to="/features">Learn More</Link>
        </button>
      </div>

      {/* Right Side - Feature Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {features.map((feature, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
            className="p-6 bg-gray-800 rounded-xl shadow-lg hover:scale-105 transition-all"
          >
            <div className="text-4xl">{feature.icon}</div>
            <h3 className="text-xl font-semibold mt-3">{feature.title}</h3>
            <p className="text-gray-400 mt-1">{feature.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default EventFeatures;
