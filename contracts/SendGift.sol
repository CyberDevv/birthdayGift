//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract GiftMe {
    uint totalGifts;
    uint private seed;

    struct Gift {
        address sender;
        uint amount;
        string message;
        uint timestamp;
    }

    Gift[] gifts;

    event NewGift(address indexed from, uint256 timestamp, string message, uint amount);

    function sendGift(string memory _message, uint _amount) public payable {
        gifts.push(Gift(msg.sender, _amount, _message, block.timestamp));

        totalGifts += 1;

        emit NewGift(msg.sender, block.timestamp, _message, _amount);
    }

    function getAllGifts() public view returns (Gift[] memory) {
        return gifts;
    }

    function getTotalGift() public view returns (uint) {
        return totalGifts;
    }
}