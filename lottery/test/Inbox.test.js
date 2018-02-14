// assert module, standard library in node js runtime
// making assertions about tests
const assert = require('assert');

// local ethereum test network
const ganache = require('ganache-cli');

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

// How Web3 is organized, use constructor to make an instance of web3
// Have to set up a provider to comm between web3 and ethereum network
const Web3 = require('web3');

// Adding for workaround of known issue
const provider = ganache.provider();

// Setup local isntance of web3, tells instance to connect to provider
// Will change over time depending on what network you connect to
// This comes up again with metamask
const web3 = new Web3(provider);

// Produced by compile.js file, used Solidity compiler to compile our contract
// Returning only the definition of the contract inbox
// Interface is the javascript abi, Bytecode is the raw compiled contract
// Import both those properties from complile js in to test file
const { interface, bytecode } = require('../compile');

// Define variables ahead of time with let keyword
let accounts;
let inbox;

// Grab the list of accounts
// Wait for that request to be completed
// Assign that list of accounts to the accounts variable
beforeEach(async () => {
  accounts = await web3.eth.getAccounts();

// Use one of those accounts to deploy the contract
// Async operation by adding in await keyword
// Assign the contract to the inbox variable
// Pass in json interface
// Call dot deploy to tell web3 to deploy a new copy of this contract
// Pass in an object with two properties, bytecode, arguments
// Call dot send to well web3 to send a txn that creats this contract
inbox = await new web3.eth.Contract(JSON.parse(interface))
  .deploy({ data: bytecode, arguments: ['Hi there!'] })
  .send({ from: accounts[0], gas: '1000000' })

inbox.setProvider(provider);
});

// Test contract deployment, default message, set message
describe('Inbox', () => {
  it('deploys a contract', () => {
    assert.ok(inbox.options.address);
  });

  it('has a default message', async () => {
    const message = await inbox.methods.message().call();
    assert.equal(message, 'Hi there!');
  });

  it('it can change the message', async () => {
    await inbox.methods.setMessage('bye').send({ from: accounts[0] });
    const message = await inbox.methods.message().call();
    assert.equal(message, 'bye');
  });

});



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
