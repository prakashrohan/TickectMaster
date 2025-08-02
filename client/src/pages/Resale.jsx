import { ethers } from 'ethers';
import React, { useEffect, useState } from 'react';

const Resale = ({ state, account }) => {
    const { contract, web3 } = state;
    const [resaleTickets, setResaleTickets] = useState([]);

    useEffect(() => {
        const fetchResaleTickets = async () => {
            if (!contract) return;

            const totalOccasions = await contract.totalOccasions();
            let resaleList = [];

            for (let i = 1; i <= totalOccasions; i++) {
                const seatsTaken = await contract.getSeatsTaken(i);

                for (let seat of seatsTaken) {
                    const isResale = await contract.resaleAllowed(i, seat);
                    if (isResale) {
                        const occasion = await contract.getOccasion(i);
                        const tokenId = await contract.seatToTokenId(i, seat);
                        const ownerAddress = await contract.ownerOf(tokenId);

                        resaleList.push({
                            eventId: i,
                            seatId: seat,
                            eventName: occasion.name,
                            price: Number(occasion[2]) / 1e18,
                            date: occasion.date,
                            time: occasion.time,
                            location: occasion.location,
                            bannerImage: occasion.bannerImage,
                            vrVideo: occasion.vrVideo,
                            ownerAddress,
                        });
                    }
                }
            }
            setResaleTickets(resaleList);
        };

        fetchResaleTickets();
    }, [contract]);

    const buyResaleTicket = async (eventId, seatId, priceInEth) => {


        if (!contract || !account) return;
        const priceInWei = ethers.parseEther(priceInEth); // ✅ Convert ETH to Wei safely



        try {
            await contract.buyResaleTicket(eventId, seatId, { value: priceInWei });
            alert('Ticket purchased successfully!');
            window.location.reload();
        } catch (error) {
            console.error('Error purchasing resale ticket:', error);
            alert('Transaction failed');
        }
    };

    return (
        <div className='py-10'>
            <h2 className="text-3xl font-bold text-center mb-8">Resale Tickets</h2>
            {resaleTickets.length > 0 ? (
                <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {resaleTickets.map((ticket, index) => (
                        <div key={index} className="bg-white shadow-lg rounded-xl p-6 transition hover:shadow-2xl">
                            {ticket.bannerImage && (
                                <img
                                    src={ticket.bannerImage}
                                    alt="Event Banner"
                                    className="w-full h-40 object-cover rounded-lg mb-4"
                                />
                            )}

                            <h3 className="text-lg font-semibold text-gray-900">{ticket.eventName}</h3>
                            <p className="text-sm text-gray-600"><strong>Event ID:</strong> {ticket.eventId}</p>
                            <p className="text-sm text-gray-600"><strong>Seat ID:</strong> {ticket.seatId}</p>
                            <p className="text-sm text-gray-600"><strong>Location:</strong> {ticket.location}</p>
                            <p className="text-sm text-gray-600"><strong>Date:</strong> {ticket.date} | <strong>Time:</strong> {ticket.time}</p>
                            <p className="text-sm text-gray-600"><strong>Owner:</strong> {ticket.ownerAddress.substring(0, 6)}...{ticket.ownerAddress.slice(-4)}</p>

                            <div className="flex justify-between items-center mt-4">
                                <p className="text-xl font-bold text-blue-600">{ticket.price} ETH</p>
                                <button
                                    onClick={() => buyResaleTicket(ticket.eventId, ticket.seatId, ticket.price.toString())}
                                    className="bg-blue-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-600 transition"
                                >
                                    Buy Ticket
                                </button>
                            </div>

                        </div>
                    ))}
                </div>
            ) : (
                <p className="text-center text-gray-500 text-lg">No tickets available for resale.</p>
            )}
        </div>
    );
};

export default Resale;
