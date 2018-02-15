const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');
const provider = ganache.provider();
const web3 = new Web3(provider);
const { interface, bytecode } = require('../compile');

let lottery;
let accounts;

beforeEach(async () => {
  accounts = await web3.eth.getAccounts();

  lottery = await new web3.eth.Contract(JSON.parse(interface))
  .deploy({ data: bytecode })  .send({ from: accounts[0], gas: '1000000' })

lottery.setProvider(provider);
});

describe('Lottery Contract', () => {
  it('deploys a contract', () => {
    assert.ok(lottery.options.address);
  });

  it('allows one account to enter', async () => {
    await lottery.methods.enter().send({
      from: accounts[0],
      value: web3.utils.toWei('0.02', 'ether')
    });

// Get a  list of players
  const players = await lottery.methods.getPlayers().call({
    from: accounts[0]
  });

// Make sure there is only one record, also correct addres is stored inside
  assert.equal(accounts[0], players[0]);
  assert.equal(1, players.length);
  });

  it('allows multiple accounts to enter', async () => {
    await lottery.methods.enter().send({
      from: accounts[0],
      value: web3.utils.toWei('0.02', 'ether')
    });
    await lottery.methods.enter().send({
      from: accounts[1],
      value: web3.utils.toWei('0.02', 'ether')
    });
    await lottery.methods.enter().send({
      from: accounts[2],
      value: web3.utils.toWei('0.02', 'ether')
    });

// Get a  list of players, assert there are now 3 addresses
  const players = await lottery.methods.getPlayers().call({
    from: accounts[0]
  });

// Now check for accounts to be correct
  assert.equal(accounts[0], players[0]);
  assert.equal(accounts[1], players[1]);
  assert.equal(accounts[2], players[2]);
  assert.equal(3, players.length);
  });

// Test to require min, sending under req amt
// Using try - catch to make sure there is an error, if not fail test
// assert(false) is if we get this far fail test
  it('requires a minimum amount of ether to enter', async () => {
    try {
      await lottery.methods.enter().send({
        from: accounts[0],
        value: 200
      });
      assert(false);
    } catch (err) {
      assert(err);
    }
  });

// If someone other than manager calls pickWinner throw a error
// Dont have to call enter in the contract here, can just call pickWinner
// Should immediately get kicked out bc of the restrict modifier
  it('only manager can call pickWinner', async () => {
    try {
      await lottery.methods.pickWinner().send({
        from: accounts[1]
      });
      assert(false);
    } catch (err) {
      assert(err);
    }
  });
});
