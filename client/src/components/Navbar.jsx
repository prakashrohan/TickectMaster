import React, { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function Navbar({ account, connectWallet, state }) {
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [occasions, setOccasions] = useState([]);
  const [dropdownData, setDropdownData] = useState([]);
  const { contract } = state;

  useEffect(() => {
    if (contract) fetchAllEvents();
  }, [contract]);

  const fetchAllEvents = async () => {
    if (!contract) return;
    try {
      const occasionsList = [];
      const occasionCount = await contract.totalOccasions();

      for (let index = 1; index <= occasionCount; index++) {
        const occasion = await contract.getOccasion(index);
        occasionsList.push({
          id: Number(occasion[0]),
          name: occasion[1],
          cost: Number(occasion[2]) / 1e18,
          maxTickets: Number(occasion[3]),
          remainingTickets: Number(occasion[4]),
          date: occasion[5],
          time: occasion[6],
          location: occasion[7],
          vrUrl: occasion[8],
        });
      }
      setOccasions(occasionsList);
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    const filteredOccasions = occasions.filter((occasion) =>
      occasion.name.toLowerCase().includes(query.toLowerCase())
    );

    setDropdownData(filteredOccasions);
    setShowDropdown(query.length > 0);
  };

  const links = [
    { name: "Home", path: "/" },
    { name: "Register", path: "/register" },
    { name: "About", path: "/about" },
    { name: "Contact Us", path: "/contactus" },
    { name: "Events", path: "/events" },
    { name: "Resale", path: "/resale" },
    ...(account ? [{ name: "My Tickets", path: "/myTickets" }] : []),
    ...(account ? [{ name: "My Events", path: "/myEvents" }] : []),
  ];

  return (
    <nav className="flex justify-between items-center py-4 px-6 shadow-md bg-gray-900 text-white">
      {/* Left - Logo & Navigation Links */}
      <div className="flex items-center space-x-8">
        <img src="./logo.webp" alt="Logo" className="h-12 w-auto" />

        <ul className="hidden md:flex space-x-6">
          {links.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <li key={item.path} className="relative cursor-pointer px-4 py-2">
                {isActive && (
                  <motion.span
                    layoutId="active-pill"
                    className="absolute inset-0 bg-white/20 rounded-full"
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  />
                )}

                <Link
                  to={item.path}
                  className={`relative z-10 transition-colors duration-300 ${
                    isActive ? "text-blue-400 font-semibold" : "text-gray-300 hover:text-white"
                  }`}
                >
                  {item.name}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>

      {/* Middle - Search Bar */}
      <div className="relative w-64">
        <input
          type="text"
          placeholder="Search events..."
          value={searchQuery}
          onChange={handleSearchChange}
          className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white border border-gray-700 focus:ring-2 focus:ring-blue-500 outline-none"
        />

        {/* Dropdown Menu */}
        {showDropdown && (
          <div className="absolute opacity-90 top-full mt-8 w-[40vh]  bg-gray-950 border border-gray-800 rounded-lg shadow-lg z-50 overflow-hidden backdrop-blur-lg transition-all duration-300">
            <ul className="divide-y divide-gray-800">
              {dropdownData.length > 0 ? (
                dropdownData.map((occasion) => (
                  <li
                    key={occasion.id}
                    className="p-4 flex flex-col space-y-2 cursor-pointer transition-all duration-300 hover:bg-gray-900/70 hover:scale-[1.02] rounded-lg"
                  >
                    <h3 className="text-lg font-semibold text-white">{occasion.name}</h3>
                    <div className="text-sm text-gray-400 space-y-1">
                      <p>
                        <span className="font-medium text-blue-400">💰 Cost:</span> {occasion.cost} ETH
                      </p>
                      <p>
                        <span className="font-medium text-green-400">🎟 Tickets:</span> {occasion.remainingTickets} / {occasion.maxTickets}
                      </p>
                      <p>
                        <span className="font-medium text-yellow-400">📅 Date:</span> {occasion.date}
                      </p>
                      <p>
                        <span className="font-medium text-pink-400">⏰ Time:</span> {occasion.time}
                      </p>
                      <p>
                        <span className="font-medium text-purple-400">📍 Location:</span> {occasion.location}
                      </p>
                    </div>
                  </li>
                ))
              ) : (
                <li className="p-4 text-gray-500 text-center">No results found</li>
              )}
            </ul>
          </div>
        )}
      </div>

      {/* Right - Wallet Button */}
      <button
        onClick={connectWallet}
        className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-all"
      >
        {account ? `Connected: ${account.slice(0, 6)}...${account.slice(-4)}` : "Connect Wallet"}
      </button>
    </nav>
  );
}
