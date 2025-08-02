// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract PatientMedication {

    struct MedicationRecord {
        uint256 recordId;
        string medicationName;
        string dosage;
        string instructions;
        uint256 issueDate;
        string prescribingDoctor;
        string receipt;
    }

    mapping(address => MedicationRecord[]) private patientRecords;

    event MedicationRecordAdded(
        address indexed patientAddress,
        uint256 recordId,
        string medicationName
    );

    function addMedicationRecord(
        string memory _medicationName,
        string memory _dosage,
        string memory _instructions,
        string memory _prescribingDoctor,
        string memory _receipt
    ) public {
        uint256 newRecordId = patientRecords[msg.sender].length + 1;

        MedicationRecord memory newRecord = MedicationRecord({
            recordId: newRecordId,
            medicationName: _medicationName,
            dosage: _dosage,
            instructions: _instructions,
            issueDate: block.timestamp,
            prescribingDoctor: _prescribingDoctor,
            receipt: _receipt
        });

        patientRecords[msg.sender].push(newRecord);

        emit MedicationRecordAdded(msg.sender, newRecordId, _medicationName);
    }

    function getMyMedicationRecords()
        public
        view
        returns (MedicationRecord[] memory)
    {
        return patientRecords[msg.sender];
    }


    function getPatientMedicationRecords(address _patient)
        public
        view
        returns (MedicationRecord[] memory)
    {
        return patientRecords[_patient];
    }
}
