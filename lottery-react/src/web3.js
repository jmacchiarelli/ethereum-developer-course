import Web3 from 'web3';

// Rip provider out from the one injected with Metamask to current
const web3 = new Web3(window.web3.currentProvider);

// Any other file can import this, get a pre built pre set up web3, most current
export default web3;

// Next we add this to App.js and add a console log to check version
