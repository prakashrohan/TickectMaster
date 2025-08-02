import { useState } from "react";
import { BrowserRouter as Router, Routes, Route ,Link } from "react-router-dom";
import { ethers } from "ethers";
import abi from "./abis/TicketMaster.json"; // Adjust the path
import Home from "./pages/Home";
import Register from "./pages/Register";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Events from "./pages/Events";
import ContactUs from "./components/ContactUs";
import Resale from "./pages/Resale";
import MyTickets from "./pages/MyTickets";
import Navbar from "./components/Navbar"; // New Navbar Component
import AIChatButton from "./components/AIChatButton";
import MyEvents from "./pages/MyEvents";
import ScanTicket from "./components/ScanTicket";
import CategoryCard from "./components/CategoryCard";

export default function App() {
  const [account, setAccount] = useState("");
  const [state, setState] = useState({
    provider: null,
    signer: null,
    contract: null,
  });

//   async function connectWallet() {
//     const contractAddress = "0x31eb8ad0F745F2577eFecE7b41EeD9D2a215b5C0";
//     const contractABI = abi.abi;

//     try {
//       const { ethereum } = window;
//       if (!ethereum) {
//         alert("Metamask is not installed");
//         return;
//       }

//       const accounts = await ethereum.request({ method: "eth_requestAccounts" });
// ``
//       if (accounts.length === 0) {
//         alert("No account found");
//         return;
//       }

//       const provider = new ethers.BrowserProvider(window.ethereum);
//       const signer = await provider.getSigner();
//       const address = await signer.getAddress();

//       setAccount(address); // Update state with wallet address
// console.log(contractAddress, contractABI, signer);
//       const contract = new ethers.Contract(contractAddress, contractABI, signer);
//       setState({ provider, signer, contract });
//     } catch (error) {
//       console.error("Error connecting to Metamask:", error);
//     }
//   }

async function connectWallet() {
  const contractAddress = "0x31eb8ad0F745F2577eFecE7b41EeD9D2a215b5C0";
  const contractABI = abi.abi;

  try {
    const { ethereum } = window;
    if (!ethereum) {
      alert("Metamask is not installed");
      return;
    }

    const accounts = await ethereum.request({ method: "eth_requestAccounts" });
    if (accounts.length === 0) {
      alert("No account found");
      return;
    }

    const provider = new ethers.BrowserProvider(ethereum); // no need to await
    const signer = await provider.getSigner();
    const address = await signer.getAddress();
    setAccount(address);

    const contract = new ethers.Contract(contractAddress, contractABI, signer);
    setState({ provider, signer, contract });

    console.log("Connected:", address);
  } catch (error) {
    console.error("Error connecting to Metamask:", error);
    alert("Failed to connect wallet. See console for details.");
  }
}

  return (
      <div className="min-h-screen bg-gray-900 text-white">
        <Navbar account={account} connectWallet={connectWallet} state={state}/>
        <AIChatButton account={account}  state={state}/>

        {/* Routing Configuration */}
        <Routes>
          <Route exact path="/" element={<Home state={state} />} />
          <Route path="/register" element={<Register state={state} account={account} />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/events" element={<Events state={state} account={account} />} />
          <Route path="/contactus" element={<ContactUs />} />
          <Route path="/resale" element={<Resale state={state} account={account} />} />
          <Route path="/myTickets" element={<MyTickets state={state} account={account} />} />
          <Route path="/myEvents" element={<MyEvents state={state} account={account} />} />
          <Route path="/scanTicket/:id/:seatId" element={<ScanTicket state={state} account={account} connectWallet={connectWallet}/>} />
        </Routes>
      </div>
  );
}
