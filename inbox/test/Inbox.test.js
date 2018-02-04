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


// Mocha Overview
// Test running framework, test javascript code
// 3 funtions to work with Mocha
// it, describe, beforeEach
// it: run and make an assertion
// describe: group together it functions
// beforeEach: execute some general setup code

class Car {
  park() {
    return 'stopped';
  }

  drive() {
    return 'vroom';
  }
}
// Writing a class we will attempt to test

describe('Car Class dsafs', () => {
  it('can park', () => {
    const car = new Car();
    assert.equal(car.park(), 'stopped');
  });

  it('can drive', () => {
    const car = new Car();
    assert.equal(car.drive(), 'vroom');
  })
});
// Testing if we call park if the string stopped is returned
// Adding another it statement to test drive
