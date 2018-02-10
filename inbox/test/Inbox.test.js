const assert = require('assert');
// assert module, standard library in node js runtime
// making assertions about tests

const ganache = require('ganache-cli');
// local ethereum test network

const Web3 = require('web3');
// make use of Web3 importing a constructor function
// used to create intstances of the Web3 library
// instance of Web3, assign the instance to a variable that is lowercase

// Web3 versioning, in ethereum end all solution for communication
// programmatic access to ethereum network
// 2 groups in the wild, v0.x.x and v1.x.x
// We installed v1, vast majority of things are using older v
// Thanks Stephen
// v0 primitive interface, only callback functions for async code
// v1 support for promises, async/wait
// Stephen says no callbacks, no spaghettti code

// How Web3 is organized
// Use constructor to make an instance of web3
// Have to set up a provider to comm between web3 and ethereum network

const web3 = new Web3(ganache.provider());
// Setup local isntance of web3
// Tells instance to connect to provider
// Will change over time depending on what network you connect to
// This comes up again with metamask

const { interface, bytecode } = require('../compile');
// Produced by compile.js file
// Used Solidity compiler to compile our contract
// Returning only the definition of the contract inbox
// Interface is the javascript abi
// Bytecode is the raw compiled contract
// Import both those properties from complile js in to test file


let accounts;
let inbox;

beforeEach(async () => {
  accounts = await web3.eth.getAccounts();
// Define variable ahead of time with let keyword
// Whenever this file is executed the accounts varuable will be defined
// The before each statement will run
// Grab the list of accounts
// Wait for that request to be completed
// Assign that list of accounts to the accounts variable
// The we can add a statement in our it block


inbox = await new web3.eth.Contract(JSON.parse(interface))
  .deploy({ data: bytecode, arguments: ['Hi there!'] })
  .send({ from: accounts[0], gas: '1000000' })
});
// Use one of the accounts to deploy the contract
// Creating an instance of a contract
// Pass in JSON interface
// Call dot deploy method to chain on to object returned
// Pass in an object, 2 properties assigned to it
// Initial startup arguments for our contract
// Specify account we want to deploy the contract from
// Assign the contract to the inbox variable
// Async operation so add in await keyword

describe('Inbox', () => {
  it('deploys a contract', () => {
    console.log(inbox);
  });
});
// Console log of inbox

// Mocha Overview
// Test running framework, test javascript code
// 3 funtions to work with Mocha
// it, describe, beforeEach
// it: run and make an assertion
// describe: group together it functions
// beforeEach: execute some general setup code
// Test that was set up are not commented out below

// class Car {
//  park() {
//  }

//  drive() {
//    return 'vroom';
//  }
// }
// Writing a class we will attempt to test

// let car;
// define car variable ahead of time with let

// beforeEach (() => {
//  car = new Car();
// });
// beforeEach is for common initialiation code

// describe('Car', () => {
//  it('can park', () => {
//    assert.equal(car.park(), 'stopped');
//  });

//  it('can drive', () => {
//    assert.equal(car.drive(), 'vroom');
//  })
// });
// Testing if we call park if the string stopped is returned
// Adding another it statement to test drive
