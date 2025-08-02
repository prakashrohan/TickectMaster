// SPDX-License-Identifier: MIT
pragma solidity >=0.8.2 <0.9.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract TicketMaster is ERC721, Ownable {
    uint256 public totalOccasions;
    uint256 public totalSupply;

    struct Occasion {
        uint256 id;
        string name;
        uint256 cost;
        uint256 tickets;
        uint256 maxTickets;
        string date;
        string time;
        string location;
        string bannerImage;
        string vrVideo; // Initially null (empty string)
        address creator;
    }

    mapping(uint256 => Occasion) public occasions;
    mapping(uint256 => mapping(uint256 => address)) public seatTaken;
    mapping(uint256 => mapping(address => bool)) public hasBought;
    mapping(uint256 => uint256[]) public seatsTaken;
    mapping(uint256 => mapping(uint256 => bool)) public ticketExhausted;
    mapping(uint256 => mapping(uint256 => bool)) public resaleAllowed;
    mapping(address => uint256[]) public creatorEvents;

    mapping(uint256 => mapping(uint256 => uint256)) public seatToTokenId;

    constructor() ERC721("Token", "Ticket") Ownable(msg.sender) {}

    function list(
        string memory _name,
        uint256 _cost,
        uint256 _maxTickets,
        string memory _date,
        string memory _time,
        string memory _location,
        string memory _bannerImage
    ) public onlyOwner {
        totalOccasions++;
        occasions[totalOccasions] = Occasion(
            totalOccasions, _name, _cost, _maxTickets, _maxTickets, _date, _time, _location, _bannerImage, "", msg.sender
        );
        creatorEvents[msg.sender].push(totalOccasions);
    }

    function mint(uint256 _id, uint256 _seat) public payable {
        require(_id != 0 && _id <= totalOccasions, "Invalid occasion ID");
        require(msg.value >= occasions[_id].cost, "Insufficient ETH sent");
        require(seatTaken[_id][_seat] == address(0), "Seat already taken");
        require(_seat <= occasions[_id].maxTickets, "Invalid seat number");

        totalSupply++;
        occasions[_id].tickets--;
        hasBought[_id][msg.sender] = true;
        seatTaken[_id][_seat] = msg.sender;
        seatsTaken[_id].push(_seat);
        resaleAllowed[_id][_seat] = false;
        ticketExhausted[_id][_seat] = false;

        _safeMint(msg.sender, totalSupply);
        seatToTokenId[_id][_seat] = totalSupply; // ✅ Store correct token ID for seat

    }

    function getOccasion(uint256 _id) public view returns (Occasion memory) {
        return occasions[_id];
    }

    function getSeatsTaken(uint256 _id) public view returns (uint256[] memory) {
        return seatsTaken[_id];
    }

    function getUserTickets(address _user) public view returns (uint256[] memory, uint256[] memory) {
        uint256[] memory eventIds = new uint256[](totalSupply);
        uint256[] memory seatIds = new uint256[](totalSupply);
        uint256 count = 0;

        for (uint256 i = 1; i <= totalOccasions; i++) {
            for (uint256 j = 0; j < seatsTaken[i].length; j++) {
                uint256 seat = seatsTaken[i][j];
                if (seatTaken[i][seat] == _user) {
                    eventIds[count] = i;
                    seatIds[count] = seat;
                    count++;
                }
            }
        }

        uint256[] memory finalEventIds = new uint256[](count);
        uint256[] memory finalSeatIds = new uint256[](count);
        for (uint256 k = 0; k < count; k++) {
            finalEventIds[k] = eventIds[k];
            finalSeatIds[k] = seatIds[k];
        }

        return (finalEventIds, finalSeatIds);
    }

    function getEventsCreatedBy(address _creator) public view returns (uint256[] memory) {
        return creatorEvents[_creator];
    }

    function scanTicket(uint256 _eventId, uint256 _seatId) public onlyOwner {
        require(_eventId != 0 && _eventId <= totalOccasions, "Invalid event ID");
        require(seatTaken[_eventId][_seatId] != address(0), "Seat not occupied");

        require(!ticketExhausted[_eventId][_seatId], "Ticket already used");

        ticketExhausted[_eventId][_seatId] = true;
        resaleAllowed[_eventId][_seatId] = false;
    }

    function enableResale(uint256 _eventId, uint256 _seatId) public {
        require(seatTaken[_eventId][_seatId] == msg.sender, "Not the owner of the ticket");
        require(!ticketExhausted[_eventId][_seatId], "Ticket already used");
        resaleAllowed[_eventId][_seatId] = true;
    }

function buyResaleTicket(uint256 _eventId, uint256 _ticketId) public payable {
    require(resaleAllowed[_eventId][_ticketId], "Resale not allowed");
    require(!ticketExhausted[_eventId][_ticketId], "Ticket already used");

    uint256 tokenId = seatToTokenId[_eventId][_ticketId];
    address currentOwner = ownerOf(tokenId);
    require(currentOwner != address(0), "Invalid ticket");
    require(currentOwner != msg.sender, "Cannot buy your own ticket");

    uint256 ticketPrice = occasions[_eventId].cost;
    require(msg.value == ticketPrice, "Incorrect payment amount");

    // Transfer payment to the current owner
    (bool sent, ) = payable(currentOwner).call{value: ticketPrice}("");
    require(sent, "Payment transfer failed");

    // Transfer ticket ownership to the buyer
    _transfer(currentOwner, msg.sender, tokenId);
    seatTaken[_eventId][_ticketId] = msg.sender;

    resaleAllowed[_eventId][_ticketId] = false; // Disable resale

}

    function setVRVideo(uint256 _id, string memory _vrVideo) public {
        require(_id != 0 && _id <= totalOccasions, "Invalid occasion ID");
        require(occasions[_id].creator == msg.sender, "Only event creator can set VR video");
        occasions[_id].vrVideo = _vrVideo;
    }
}
