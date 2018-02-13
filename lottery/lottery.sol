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
        require(msg.value > .01 ether);

        players.push(msg.sender);
    }

// Helper function, pseudo random number generator, can be gamed
// Take current block difficulty, current time, addresses of players
// Feed them in to a SHA3 algo, spits out a really big number
// Use really big number to pick random winner
    function random() private view returns (uint) {
        return uint(keccak256(block.difficulty, now, players));
    }

// Using a module function % to pick a winner
    function pickWinnter() public {
        uint index = random() % players.length;
    }
}
