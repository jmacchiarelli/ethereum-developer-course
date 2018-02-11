pragma solidity ^0.4.17;

contract Lottery {
    address public manager;
    address[] public players;

    function Lottery() public {
        manager = msg.sender;
    }

// Have to mark functions that can be called and sent ether as payable
// Require is for validation before code inside the function executes
// For example you can require a value aka min eth to send in wei
    function enter() public payable {
        require(msg.value > .01 ether );

        players.push(msg.sender);
    }
}
