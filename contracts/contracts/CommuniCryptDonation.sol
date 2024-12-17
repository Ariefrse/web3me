// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

contract CommuniCryptDonation is Ownable, ReentrancyGuard {
    // Donation Struct
    struct Cause {
        address causeAddress;
        string name;
        string description;
        uint256 targetAmount;
        uint256 raisedAmount;
        bool isActive;
    }

    // Events
    event CauseCreated(uint256 causeId, string name, address causeAddress);
    event DonationReceived(address donor, uint256 causeId, uint256 amount);
    event FundsClaimed(uint256 causeId, uint256 amount);

    // Mappings
    mapping(uint256 => Cause) public causes;
    mapping(uint256 => mapping(address => uint256)) public donorContributions;
    uint256 public causeCount;

    // Platform fee (e.g., 5%)
    uint256 public constant PLATFORM_FEE_PERCENT = 5;

    // Create a new donation cause
    function createCause(
        address _causeAddress, 
        string memory _name, 
        string memory _description, 
        uint256 _targetAmount
    ) external onlyOwner {
        causeCount++;
        causes[causeCount] = Cause({
            causeAddress: _causeAddress,
            name: _name,
            description: _description,
            targetAmount: _targetAmount,
            raisedAmount: 0,
            isActive: true
        });

        emit CauseCreated(causeCount, _name, _causeAddress);
    }

    // Donate to a specific cause
    function donate(uint256 _causeId) external payable nonReentrant {
        require(msg.value > 0, "Donation must be greater than 0");
        require(causes[_causeId].isActive, "Cause is not active");

        // Calculate platform fee
        uint256 platformFee = (msg.value * PLATFORM_FEE_PERCENT) / 100;
        uint256 donationAmount = msg.value - platformFee;

        // Update cause details
        causes[_causeId].raisedAmount += donationAmount;
        donorContributions[_causeId][msg.sender] += donationAmount;

        emit DonationReceived(msg.sender, _causeId, donationAmount);
    }

    // Claim funds for a cause
    function claimFunds(uint256 _causeId) external nonReentrant {
        Cause storage cause = causes[_causeId];
        require(msg.sender == cause.causeAddress, "Only cause can claim");
        require(cause.raisedAmount > 0, "No funds to claim");

        uint256 claimAmount = cause.raisedAmount;
        cause.raisedAmount = 0;
        cause.isActive = false;

        (bool success, ) = cause.causeAddress.call{value: claimAmount}("");
        require(success, "Transfer failed");

        emit FundsClaimed(_causeId, claimAmount);
    }

    // Withdraw platform fees (only owner)
    function withdrawPlatformFees() external onlyOwner {
        uint256 balance = address(this).balance;
        require(balance > 0, "No fees to withdraw");
        
        (bool success, ) = owner().call{value: balance}("");
        require(success, "Transfer failed");
    }

    // Get cause details
    function getCauseDetails(uint256 _causeId) external view returns (Cause memory) {
        return causes[_causeId];
    }

    // Fallback function to receive ETH
    receive() external payable {}
}
