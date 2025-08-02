
const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("TicketMaster", (m) => {

  const TicketMaster = m.contract("TicketMaster");



  return {
    TicketMaster,
  };
});
