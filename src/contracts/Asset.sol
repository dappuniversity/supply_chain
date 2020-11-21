pragma solidity ^0.5.0;

contract Asset {
  //name

  //custodial

  //enum's variable

  //enum


  //Event


  constructor(string memory _name) public {
    // Set name


    // Make deployer custodian


    // Update status to "CREATED"


    // Log history

  }

  function send(address _to) public {
    // Must be custodian to send


    // Cannot send to self


    // Can't be in "SENT" status
    // Must be "CREATED" or "RECEIVED"


    // Update status to "SENT"


    // Make _to new custodian


    // Log history

  }

  function receive() public {
    // Must be custodian to receive


    // Must be in "SENT" status
    // Cannot be "CREATED" or "RECEIVED"


    // Update status to "RECEIVED"


    // Log history

  }
}