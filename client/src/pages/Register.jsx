import React, { useState } from "react";
import axios from "axios";
import { ethers } from "ethers";
const Register = ({ state }) => {
  const { contract } = state;
  const [name, setName] = useState("");
  const [maxTickets, setMaxTickets] = useState("");
  const [cost, setCost] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [location, setLocation] = useState("");
  const [vrurl, setVrurl] = useState("");

  const uploadToIPFS = async (e) => {
    e.preventDefault();
    const file = e.target.files[0];

    if (file) {
      try {
        const formData = new FormData();
        formData.append("file", file);
      const res = await axios({
  method: "post",
  url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
  data: formData,
  headers: {
    Authorization: `Bearer ${import.meta.env.VITE_PINATA_JWT}`,
    "Content-Type": "multipart/form-data",
  },
});


        const resData = res.data;
        setVrurl(`https://ipfs.io/ipfs/${resData.IpfsHash}`);
      } catch (error) {
        console.error("Error uploading file:", error);
      }
    }
  };

const handleSubmit = async (e) => {
  e.preventDefault();

  if (!contract) {
    console.error("Smart contract not initialized");
    alert("Please connect your wallet or wait for the contract to load.");
    return;
  }

  try {

    const tx = await contract.list(
      name,
      ethers.parseEther(cost),
      maxTickets,
      date,
      time,
      location,
      vrurl
    );
    await tx.wait();
    console.log(tx);
    alert("Event Registered!");
    window.location.reload();
  } catch (error) {
    console.log("Transaction error:", error);
    alert("Error listing the occasion. See console for details.");
  }
};


  return (
    <div className="max-w-2xl  bg-gradient-to-br from-gray-900 mx-auto mt-12 p-10 text-white rounded-2xl shadow-2xl border border-gray-700">
        <h2 className="text-4xl font-extrabold text-center mb-8 tracking-wide">
          List an Occasion
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Event Name */}
          <div>
            <label className="block text-lg font-semibold mb-2">
              Event Name
            </label>
            <input
              type="text"
              name="name"
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full p-4 bg-gray-800 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-green-500 outline-none placeholder-gray-400"
              placeholder="Enter event name"
            />
          </div>

          {/* Cost */}
          <div>
            <label className="block text-lg font-semibold mb-2">
              Cost (ETH)
            </label>
            <input
              type="number"
              name="cost"
              step="any"
              onChange={(e) => setCost(e.target.value)}
              required
              className="w-full p-4 bg-gray-800 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-green-500 outline-none placeholder-gray-400"
              placeholder="Enter cost"
            />
          </div>

          {/* Max Tickets */}
          <div>
            <label className="block text-lg font-semibold mb-2">
              Max Tickets
            </label>
            <input
              type="number"
              name="maxTickets"
              onChange={(e) => setMaxTickets(e.target.value)}
              required
              className="w-full p-4 bg-gray-800 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-green-500 outline-none placeholder-gray-400"
              placeholder="Enter max tickets"
            />
          </div>

          {/* Date & Time */}
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-lg font-semibold mb-2">Date</label>
              <input
                type="date"
                name="date"
                onChange={(e) => setDate(e.target.value)}
                required
                className="w-full p-4 bg-gray-800 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-green-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-lg font-semibold mb-2">Time</label>
              <input
                type="time"
                name="time"
                onChange={(e) => setTime(e.target.value)}
                required
                className="w-full p-4 bg-gray-800 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-green-500 outline-none"
              />
            </div>
          </div>

          {/* Location */}
          <div>
            <label className="block text-lg font-semibold mb-2">Location</label>
            <input
              type="text"
              name="location"
              onChange={(e) => setLocation(e.target.value)}
              required
              className="w-full p-4 bg-gray-800 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-green-500 outline-none placeholder-gray-400"
              placeholder="Enter event location"
            />
          </div>

          {/* Upload Banner */}
          <div>
            <label className="block text-lg font-semibold mb-2">
              Upload Banner
            </label>
            <div className="border border-dashed border-gray-500 p-6 rounded-lg flex flex-col items-center justify-center cursor-pointer bg-gray-800 hover:bg-gray-700 transition-all">
              <input
                type="file"
                accept="image/*"
                onChange={uploadToIPFS}
                className="hidden"
                id="fileUpload"
              />
              <label
                htmlFor="fileUpload"
                className="bg-blue-600 hover:from-purple-600 hover:to-blue-700 px-6 py-3 rounded-xl text-white font-semibold transition-all cursor-pointer shadow-lg shadow-purple-400/30 hover:shadow-blue-500/40 active:scale-95"
              >
                Choose File
              </label>
            </div>
            {vrurl && (
              <p className="text-sm text-green-400 mt-2">
                File uploaded successfully!
              </p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-xl py-4 bg-gradient-to-r from-purple-500 to-blue-600 text-white font-semibold text-lg rounded-xl shadow-lg shadow-purple-400/30 backdrop-blur-md transition-all hover:scale-101 cursor-pointer hover:shadow-blue-500/40 active:scale-100 active:shadow-sm"
          >
            List Occasion
          </button>
        </form>
      </div>
  );
};

export default Register;
