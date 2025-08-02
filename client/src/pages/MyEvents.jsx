import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ethers } from 'ethers';

const MyEvents = ({ state, account }) => {
    const { contract } = state;
    const [myEvents, setMyEvents] = useState([]);
    const [selectedFile, setSelectedFile] = useState(null);
    const [vrUrl, setVrUrl] = useState("");

    useEffect(()=>{
        getMyEvents();
    },[state])

    const getMyEvents = async () => {
        try {
            const eventIds = await contract.getEventsCreatedBy(account);

            const eventsData = await Promise.all(
                eventIds.map(async (eventId) => {
                    const eventDetails = await contract.occasions(eventId);
                    return {
                        id: eventDetails.id.toString(),
                        name: eventDetails.name,
                        cost: eventDetails.cost.toString(),
                        tickets: eventDetails.tickets.toString(),
                        maxTickets: eventDetails.maxTickets.toString(),
                        date: eventDetails.date,
                        time: eventDetails.time,
                        location: eventDetails.location,
                        bannerImage: eventDetails.bannerImage,
                        vrVideo: eventDetails.vrVideo,
                        creator: eventDetails.creator,
                    };
                })
            );
            setMyEvents(eventsData);
        } catch (error) {
            console.error("Error fetching events:", error);
        }
    };

    const handleFileChange = async (event) => {
        const file = event.target.files[0];

        if (file) {
            try {
                const formData = new FormData();
                formData.append("file", file);
                const res = await axios({
                    method: "post",
                    url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
                    data: formData,
                    headers: {
                        pinata_api_key: "35cb1bf7be19d2a8fa0d",
                        pinata_secret_api_key: "2c2e9e43bca7a619154cb48e8b060c5643ea6220d0b7c9deb565fa491b3b3a50",
                        "Content-Type": "multipart/form-data",
                    },
                });

                const resData = res.data;
                setVrUrl(`https://ipfs.io/ipfs/${resData.IpfsHash}`);
                console.log("Uploaded VR Video URL:", `https://ipfs.io/ipfs/${resData.IpfsHash}`);
            } catch (error) {
                console.error("Error uploading file:", error);
            }
        }
    };

    const uploadVRVideo = async (id) => {
        try {
            const tx = await contract.setVRVideo(id, vrUrl);
            await tx.wait();
            console.log("VR Video updated on blockchain:", tx);
        } catch (error) {
            console.error("Error updating VR video:", error);
        }
    };

    return (
        <div className="container mx-auto p-4 py-10">
            <h2 className="text-3xl font-bold text-center mb-8">My Events</h2>
            {/* <button className="bg-blue-500 text-white px-4 py-2 rounded-md" onClick={getMyEvents}>Get My Events</button> */}

            {myEvents.length > 0 ? (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
    {myEvents.map((event) => (
      <div
        key={event.id}
        className="border rounded-lg shadow-lg bg-white text-black relative overflow-hidden group"
      >
        {/* Banner Image with Overlay */}
        <div className="relative w-full h-48">
          <img
            src={event.bannerImage}
            alt={event.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent p-4">
            <span className="bg-yellow-500 text-white text-xs px-2 py-1 rounded-lg">
              6.5/10
            </span>
            <span className="bg-pink-500 text-white text-xs px-2 py-1 rounded-lg ml-2">
              Bestseller
            </span>
            <h3 className="text-lg font-semibold text-white mt-2">
              {event.name}
            </h3>
          </div>
        </div>

        {/* Event Details */}
        <div className="p-4 space-y-2">
          <p className="text-sm text-gray-600">{event.location}</p>
          <p className="text-sm text-gray-600">📅 {event.date} | ⏰ {event.time}</p>

          {/* Price & Buy Button Section */}
          <div className="flex justify-between items-center mt-3">
            <span className="text-lg font-bold text-purple-600">
              From {ethers.formatEther(event.cost)} ETH
            </span>
            <button
              className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition"
              onClick={() => handleBuyTicket(event)}
            >
              Buy Ticket
            </button>
          </div>

          {/* VR Video Section (Only Show on Hover) */}
          {event.vrVideo ? (
            <div className="relative mt-4">
              <p className="text-blue-500">🎥 VR Video Available</p>
              <div className="absolute top-0 left-0 w-full h-full hidden group-hover:block">
                <video
                  src={event.vrVideo}
                  className="w-full h-40 rounded-md border border-gray-300 shadow-md mt-2"
                  controls
                />
              </div>
            </div>
          ) : (
            // Show File Upload & Upload Button only if no VR Video
            <div className="mt-4 flex items-center space-x-2">
              <input
                type="file"
                accept="video/*"
                className="border border-gray-300 text-sm p-2 rounded-md bg-gray-100 flex-1"
                onChange={handleFileChange}
              />
              <button
                className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md transition"
                onClick={() => uploadVRVideo(event.id)}
              >
                Upload VR
              </button>
            </div>
          )}
        </div>
      </div>
    ))}
  </div>
) : (
  <p className="text-center text-gray-400">No events found</p>
)}



        </div>
    );
};

export default MyEvents;
