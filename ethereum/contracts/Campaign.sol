// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

contract CampaignFactory {
    // Array that holds all deployed campaigns as structs. 
    address[] public deployedCampaigns;
    
    // Function to create new campaign. 
    // Parameter is minimum amount to contribute. 
    function createCampaign(uint minimum) public payable {
       address newCampaign = address(new Campaign(minimum, msg.sender));
       deployedCampaigns.push(newCampaign);
    }
    
    // Gets all deployed campaigns from storage
    function getDeployedCampaigns() public view returns (address[] memory) {
        return deployedCampaigns;
    }
}

contract Campaign {
    struct Request {
        uint id;
        string description;
        uint value;
        address recipient;
        bool complete;
        uint approvalCount; // Number of contributors approved this request
        mapping(address => bool) approvals; // All contributors and true if approved
    }
    uint numRequests = 0;
    
    // Mapping to hold all requests
    mapping(uint => Request) public requests;
    // Address to campaign manager, i.e creator of the campaign
    address public manager;
    // Minimum amount to contribute
    uint public minimumContribution;
    // Mapping to hold contributors
    mapping(address => bool) public approvers;
    // Count of contributors
    uint public approversCount;
    
    modifier restricted() {
        require(msg.sender == manager);
        _;
    }
    
    constructor(uint minimum, address creator) {
        manager = creator;
        minimumContribution = minimum;
    }
    
    function contribute() public payable {
        require(msg.value > minimumContribution, "Not enough ether provided.");
        approvers[msg.sender] = true;
        approversCount++;
    }
    
    // Create expense request, only manager of campaign can do this
    function createRequest(string calldata description, uint value, address recipient) public payable restricted {
        Request storage newRequest = requests[numRequests++];
        newRequest.id = numRequests;
        newRequest.description = description;
        newRequest.value = value;
        newRequest.recipient = recipient;
        newRequest.complete = false;
        newRequest.approvalCount = 0;
    }
    
    // Approve request for campaign
    function approveRequest(uint id) public payable {
        Request storage req = requests[id];
        // Person has contributed
        require(approvers[msg.sender]);
        // Person not already voted
        require (!req.approvals[msg.sender]);
        req.approvals[msg.sender] = true;
        req.approvalCount++;
    }
    
    // Finalize request, i.e pay out
    function finalizeRequest(uint id) public payable restricted {
        Request storage req = requests[id];
        // Not already finalized
        require(!req.complete);
        // At least 50 % approvers 
        require(req.approvalCount > (approversCount / 2 ));
        // Set finalized to true
        req.complete = true;
        payable (req.recipient).transfer(req.value);
    }
    
    // Get campaign summary
    function getSummary() public view returns (uint, uint, uint, uint, address) {
        return (
            minimumContribution, 
            address(this).balance,
            numRequests,
            approversCount,
            manager
        );
    }

    // Get number of requests for campaign
    function getRequestsCount() public view returns (uint) {
        return numRequests;
    }
}












