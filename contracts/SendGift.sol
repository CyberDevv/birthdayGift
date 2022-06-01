//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import 'hardhat/console.sol';

contract GiftMe {
  uint256 totalGifts;
  uint256 private seed;
  // address of contract deployer
  address payable owner;

  Gift[] gifts;

  // gift struct
  struct Gift {
    address from;
    string message;
    string name;
    uint256 timestamp;
  }

  // event when gift is sent
  event NewGift(
    address indexed from,
    uint256 timestamp,
    string name,
    string message
  );

  // constructor
  constructor() {
    owner = payable(msg.sender);
  }

  /**
   * @dev send gift to the contract owner
   * @param _message message of the sender
   * @param _name name of the sender
   */
  function sendGift(string memory _message, string memory _name)
    public
    payable
  {
    // add the gift to storage
    gifts.push(Gift(msg.sender, _message, _name, block.timestamp));

    // require(msg.value == 1 ether);
    // console.log(msg.value);

    totalGifts += 1;

    // Emit a log event when a new gift is sent
    emit NewGift(msg.sender, block.timestamp, _name, _message);
  }

  /**
   * @dev send gift to the contract owner
   */
  function withdrawTips() public {
    require(owner.send(address(this).balance));
  }

  /**
   * @dev retrieve all the gifts stored on the blockchain
   */
  function getAllGifts() public view returns (Gift[] memory) {
    return gifts;
  }

  /**
   * @dev gets total number of gifts
   */
  function getTotalGift() public view returns (uint256) {
    return totalGifts;
  }
}
