// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract HealthRecord {

    address public owner;

    struct HealthRecordData {
        string patientName;
        string medicalHistory;
        string prescriptions;
        string vaccinations;
        uint256 lastUpdated;
    }

    mapping(address => HealthRecordData) healthRecords;

    mapping(address => mapping(address => bool)) authorizedAccess;

    modifier onlyOwner() {
        require(msg.sender == owner, "Access Denied: Only owner can perform this action");
        _;
    }

    modifier hasAccess(address patient) {
        require(msg.sender==owner || msg.sender == patient || authorizedAccess[patient][msg.sender], "Access Denied: You are not authorized to view or modify this record");
        _;
    }

    constructor() {
        owner = msg.sender;
    }

    function updateHealthRecord(
        address patient,
        string memory _patientName,
        string memory _medicalHistory,
        string memory _prescriptions,
        string memory _vaccinations
    ) public onlyOwner {
        healthRecords[patient] = HealthRecordData({
            patientName: _patientName,
            medicalHistory: _medicalHistory,
            prescriptions: _prescriptions,
            vaccinations: _vaccinations,
            lastUpdated: block.timestamp
        });
    }

    function grantAccess(address healthcareProvider) public {
        authorizedAccess[msg.sender][healthcareProvider] = true;
    }

    function revokeAccess(address healthcareProvider) public {
        authorizedAccess[msg.sender][healthcareProvider] = false;
    }

    function viewHealthRecord(address patient) public view hasAccess(patient) returns (
        string memory patientName,
        string memory medicalHistory,
        string memory prescriptions,
        string memory vaccinations,
        uint256 lastUpdated
    ) {
        HealthRecordData memory record = healthRecords[patient];
        return (
            record.patientName,
            record.medicalHistory,
            record.prescriptions,
            record.vaccinations,
            record.lastUpdated
        );
    }

    function checkAccess(address patient, address healthcareProvider) public view returns (bool) {
        return authorizedAccess[patient][healthcareProvider];
    }
}