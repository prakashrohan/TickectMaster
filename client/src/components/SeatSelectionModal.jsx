import React, { useState, useEffect } from "react";
import { ethers } from "ethers";

const SeatSelectionModal = ({ occasion, onClose, state }) => {
  const { contract } = state;
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [seatsBooked, setSeatsBooked] = useState([]);

  if (!occasion) return null; // Ensure occasion is defined

  const toggleSeatSelection = (seatNumber) => {
    if (selectedSeats.includes(seatNumber)) {
      setSelectedSeats(selectedSeats.filter((seat) => seat !== seatNumber));
    } else {
      setSelectedSeats([...selectedSeats, seatNumber]);
    }
  };
  const getSeatsTaken = async () => {
    let tx = await contract.getSeatsTaken(occasion.id);
    tx = Object.values(tx);
    setSeatsBooked(tx);
  };

  useEffect(() => {
    getSeatsTaken();
    setSeatsBooked([]);
    setSelectedSeats([]);
    console.log(occasion.cost)
  }, [occasion]);
  const buyTicket=async(id,seat)=>{
    const tx = await contract.mint(id,seat, { value:ethers.parseEther(occasion.cost.toString()) })
    alert("Ticket Booked")
    setSelectedSeats([])
    onClose()
  }
  return (
    <div className="p-6 bg-gray-800 text-white rounded-lg">
      {/* Modal Header */}
      <h2 className="text-2xl font-bold mb-4">{occasion.name}</h2>

      {/* Occasion Details */}
      <div className="space-y-2">
        <p>
          <span className="font-semibold">Location:</span> {occasion.location}
        </p>
        <p>
          <span className="font-semibold">Date:</span> {occasion.date}
        </p>
        <p>
          <span className="font-semibold">Time:</span> {occasion.time}
        </p>
        <p>
          <span className="font-semibold">Cost:</span> {occasion.cost} ETH
        </p>
        <p>
          <span className="font-semibold">Tickets Left:</span>{" "}
          {occasion.maxTickets} / {occasion.remainingTickets}
        </p>
      </div>

      {/* Stage Rectangle and "Eyes this way" Text */}
      <div className="mt-6">
        <div className="w-full h-40 bg-blue-600 flex items-center justify-center rounded-md">
          <p className="text-white text-2xl font-bold">Stage</p>
        </div>
        <p className="text-center text-lg font-semibold mt-2">Eyes this way</p>
      </div>

      {/* Seat Selection Logic */}
      <div className="mt-6">
        <div className="grid grid-cols-11 gap-2">
          {Array.from({ length: occasion.remainingTickets }, (_, index) => (
            <React.Fragment key={index}>
              {/* Render seat buttons */}
              <button
                className={`p-2 rounded-md transition ${
                  selectedSeats.includes(index + 1)
                    ? "bg-green-600"
                    : seatsBooked.includes(BigInt(index + 1))
                    ? "bg-red-600 cursor-not-allowed"
                    : "bg-gray-700 hover:bg-gray-600"
                }`}
                onClick={() => toggleSeatSelection(index + 1)}
                disabled={seatsBooked.includes(BigInt(index + 1)) || (selectedSeats.length>0 && !selectedSeats.includes(index + 1))}
              >
                {index + 1}
              </button>
              {(index + 1) % 10 === 5 && <div className="col-span-1"></div>}
            </React.Fragment>
          ))}
        </div>
      </div>

      <button
        className={`mt-6 w-full py-2 rounded-md transition ${
          selectedSeats.length > 0
            ? "bg-red-600 hover:bg-red-500"
            : "bg-gray-400 cursor-not-allowed"
        }`}
        onClick={()=>buyTicket(occasion.id,selectedSeats[0])}
        disabled={selectedSeats.length === 0 }
      >
        Book tickets
      </button>
    </div>
  );
};

export default SeatSelectionModal;
