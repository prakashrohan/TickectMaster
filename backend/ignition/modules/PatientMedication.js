
const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("DeploymentPlusInitialization", (m) => {

  const PatientMedication = m.contract("PatientMedication");



  return {
    PatientMedication,
  };
});
