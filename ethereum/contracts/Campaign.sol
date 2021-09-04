// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

contract CampaignFactory {
    address[] public deployedCampaigns;
    
    function createCampaign(uint minimum) public payable {
       address newCampaign = address(new Campaign(minimum, msg.sender));
       deployedCampaigns.push(newCampaign);
    }
    
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
        uint approvalCount;
        mapping(address => bool) approvals;
    }
    uint numRequests = 0;
    
    mapping(uint => Request) public requests;
    address public manager;
    uint public minimumContribution;
    mapping(address => bool) public approvers;
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
    
    function createRequest(string calldata description, uint value, address recipient) public payable restricted {
        Request storage newRequest = requests[numRequests++];
        newRequest.id = numRequests;
        newRequest.description = description;
        newRequest.value = value;
        newRequest.recipient = recipient;
        newRequest.complete = false;
        newRequest.approvalCount = 0;
    }
    
    function approveRequest(uint id) public payable {
        Request storage req = requests[id];
        // Person has contributed
        require(approvers[msg.sender]);
        // Person not already voted
        require (!req.approvals[msg.sender]);
        req.approvals[msg.sender] = true;
        req.approvalCount++;
    }
    
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
    
    function getSummary() public view returns (uint, uint, uint, uint, address) {
        return (
            minimumContribution, 
            address(this).balance,
            numRequests,
            approversCount,
            manager
        );
    }

    function getRequestsCount() public view returns (uint) {
        return numRequests;
    }
}












