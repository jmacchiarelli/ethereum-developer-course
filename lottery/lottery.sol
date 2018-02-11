pragma solidity ^0.4.17;

contract Lottery {
    address public manager;
    address[] public players;

    function Lottery() public {
        manager = msg.sender;
    }

// Have to mark functions that can be called and sent ether
    function enter() public payable {
        players.push(msg.sender);
    }
}
