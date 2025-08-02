import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Modal, Input, Button, message, QRCode } from "antd";

const ScanTicket = ({ state, connectWallet, account }) => {
  const { id, seatId } = useParams();
  const { contract } = state;
  const [occasions,setOccasions] = useState(null);
  const [admin,setAdmin] = useState(false);
  const [tickets, setTickets] = useState([]);
  
  const handleResell = async (eventId, ticketId, resellPrice) => {
    if (!contract || !account) {
      console.error("Contract or account not found!");
      return;
    }

    try {
      console.log(`Initiating resale for event ${eventId}, ticket ${ticketId} at price ${resellPrice}...`);

      // Call the smart contract function with the resell price
      const tx = await contract.enableResale(eventId, ticketId, resellPrice);
      await tx.wait(); // Wait for the transaction to be mined

      console.log(`Resale enabled successfully for ticket #${ticketId} at event #${eventId}`);
    } catch (error) {
      console.error("Error enabling resale:", error);
    }
  };

  const handleViewAR = (ticketId) => {
    console.log(`View in AR clicked for ticket #${ticketId}`);
  };

  const getUserTickets = async () => {
    if (!contract || !account) return;
    setOccasions(null);
    setTickets([]);
    try {
        const occasion = await contract.getOccasion(id);
        let tx = await contract.getSeatsTaken(occasion.id);
        tx = Object.values(tx);
        for(let i=0;i<tx.length;i++){
            if(Number(tx[i])==Number(seatId) && Number(occasion[0]) == id){
                setOccasions(occasion);
                let ticketDetails=[];
                const isExhausted = await contract.ticketExhausted(id, seatId);
                ticketDetails.push({
                    id: id,
                    name: occasion.name,
                    location: occasion.location,
                    date: occasion.date,
                    time: occasion.time,
                    seat: seatId,
                    occasionTimestamp: Number(occasion.date),
                    isExhausted: isExhausted,
                  });
                  setTickets(ticketDetails[0]);
                if(occasion[10]==account){
                    setAdmin(true);
                }
                break;
            }
        }
    } catch (error) {
      console.error("Error fetching tickets:", error);
    }
  };

  useEffect(() => {
    getUserTickets();
  }, [contract, account]);

  return (
    
    <div className="flex flex-col justify-center items-center space-y-8">
     <button
        onClick={connectWallet}
        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition flex md:hidden"
      >
        {account
          ? `Connected: ${account.slice(0, 6)}...${account.slice(-4)}`
          : "Connect Wallet"}
      </button>
      {occasions && <TicketCard
        key={0}
        ticket={tickets}
        onResell={handleResell}
        onViewAR={handleViewAR}
        index={0}
        isExhausted={tickets.isExhausted}
        contract={contract}
        admin={admin}
        />}
    </div>
  );
};

const InfoBox = ({ label, value }) => {
    return (
      <div className="flex flex-col">
        <span className="font-bold uppercase text-[0.65rem] tracking-wider text-white/90">
          {label}
        </span>
        <div className="bg-white/20 text-center px-2 py-1 rounded-md mt-1 text-xs">
          {value}
        </div>
      </div>
    );
  };

const TicketCard = ({ ticket, onResell, onViewAR, index = 0, isExhausted,contract,admin }) => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [resellPrice, setResellPrice] = useState("");
    const [resellReason, setResellReason] = useState(null);
  
    const showModal = () => {
      if(ticket.isAvailableForResale){
        alert("Ticket already listed for resale");
        return
      }
      setIsModalVisible(true);
    };
  
    const handleOk = () => {
      if (!resellPrice) {
        message.error("Please enter a resell price");
        return;
      }
      onResell(ticket.id, ticket.seat);
      setIsModalVisible(false);
      setResellPrice("");
      setResellReason(null);
    };
  
    const handleCancel = () => {
      setIsModalVisible(false);
      setResellPrice("");
      setResellReason(null);
    };
  
    const handleGetAiRecommendedPrice = async() => {
      let occasion =await contract.getOccasion(ticket.id);
     const eventData = {price : Number(occasion[2]) / 1e18,left:Number(occasion[3]),total:Number(occasion[4]),today:Date.now(),endTime:occasion[6],enddate:occasion[5]};
     const response = await resolveQuery( eventData);
     const ans= JSON.parse(response)
     setResellPrice(ans.price)
     setResellReason(ans.reason)
    };
  
    const now = new Date().getTime();
    const eventStartMs = ticket.occasionTimestamp * 1000;
    const isARActive = now >= eventStartMs;
  
    const gradientStyles = [
      "bg-gradient-to-r from-blue-500 to-teal-500",
      "bg-gradient-to-r from-purple-600 to-indigo-600",
      "bg-gradient-to-r from-pink-500 to-yellow-500",
      "bg-gradient-to-r from-orange-500 to-red-500",
    ];
    const exhaustedGradient = "bg-gradient-to-r from-gray-900 via-gray-700 to-gray-800";
    const gradientClass = isExhausted ? exhaustedGradient : gradientStyles[index % gradientStyles.length];
    const allowEntry = async() =>{
        try{
            const tx = await contract.scanTicket(ticket.id,ticket.seat)
            await tx.wait()
            console.log(tx)
        }catch(e){
            console.log(e);
        }
    }
    return (
      <>
        <svg width="0" height="0">
          <defs>
            <clipPath id="ticketClip" clipPathUnits="objectBoundingBox">
              <path d="
                M 0,0 
                L 1,0 
                L 1,0.4 
                Q 0.95,0.5 1,0.6 
                L 1,1 
                L 0,1 
                L 0,0.6 
                Q 0.05,0.5 0,0.4 
                Z
              " />
            </clipPath>
          </defs>
        </svg>
  
        <div
          className={`w-full md: mx-auto max-w-[600px] ${gradientClass}`}
          style={{ clipPath: "url(#ticketClip)" }}
        >
          <div className="rounded-md overflow-hidden shadow-xl flex text-white relative">
            <div className="flex-1 p-5 relative">
              <div className="text-xs font-medium uppercase tracking-wider mb-1">
                {ticket.date} • {ticket.time}
              </div>
              <h2 className="text-2xl md:text-3xl font-extrabold mb-1 uppercase">
                {ticket.name}
              </h2>
              <p className="text-sm md:text-base font-semibold mb-2">
                Live Performance
              </p>
              <p className="text-base md:text-lg font-bold uppercase">
                {ticket.location}
              </p>
              <div className="my-3 h-px w-3/4 bg-white/30" />
              <div className="flex justify-between">
                <div className="flex flex-col">
                  <div className="flex flex-row flex-wrap gap-4 text-xs md:text-sm mb-4">
                    <InfoBox
                      label="Block"
                      value={ticket.seat % 10 <= 5 && ticket.seat !== 0 ? "Left" : "Right"}
                    />
                    <InfoBox label="Row" value={Math.floor(ticket.seat / 10) + 1} />
                    <InfoBox label="Seat" value={ticket.seat} />
                  </div>
                  {!admin && <div className="flex items-center gap-3">
                    <button
                      className="bg-white/20 hover:bg-white/30 text-white px-3 py-1 rounded-md text-xs font-semibold transition-colors"
                      onClick={showModal}
                    >
                      Resell
                    </button>
                    <button
                      onClick={() => onViewAR(ticket.id)}
                      disabled={!isARActive}
                      className={`px-3 py-1 rounded-md text-xs font-semibold transition-colors ${
                        isARActive
                          ? "bg-white/20 hover:bg-white/30 text-white"
                          : "bg-gray-300 text-gray-500 cursor-not-allowed"
                      }`}
                    >
                      View in AR
                    </button>
                  </div>}
                  {admin &&!ticket.isExhausted && <button onClick={allowEntry} className="px-3 py-1 rounded-md text-xs font-semibold transition-colors bg-red-800 text-white-500 ">Allow Entry</button>}
                </div>
                <QRCode
                style={{ width: "100px", height: "80px", overflow: "visible", border: "none" }}
                errorLevel="H"
                value={`${window.location.origin}/${ticket.id}/${ticket.seat}`}
                icon="./logo.webp"
              />
              </div>
            </div>
  
            <div className="w-24 md:w-28 border-l-2 border-dashed border-white p-3 flex flex-col justify-between relative">
              <div>
                <div className="text-xs font-semibold uppercase tracking-wider">
                  {ticket.date}
                </div>
                <div className="text-xs font-semibold uppercase tracking-wider">
                  {ticket.time}
                </div>
              </div>
              <div className="mt-2 mb-1 text-sm font-extrabold uppercase">
                {ticket.name}
              </div>
              <div className="text-xs uppercase">{ticket.location}</div>
              <div className="text-xs mt-2 font-bold">Seat {ticket.seat}</div>
            </div>
          </div>
        </div>
  
        <Modal
          title="Resell Ticket"
          visible={isModalVisible}
          onOk={handleOk}
          onCancel={handleCancel}
          okText="Resell"
          cancelText="Cancel"
        >
          <Input
            placeholder="Enter resell price"
            value={resellPrice}
            onChange={(e) => setResellPrice(e.target.value)}
            style={{ marginBottom: "16px" }}
          />
          <Button onClick={handleGetAiRecommendedPrice} style={{ marginBottom: "16px" }}>
            Get AI Recommended Price
          </Button>
          {resellReason && (<div>{resellReason}</div>)}
        </Modal>
      </>
    );
  };


export default ScanTicket;