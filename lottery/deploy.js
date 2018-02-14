const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const { interface, bytecode } = require('./compile');

// Creating a path to retrieve the mnemonic pass phrase
const path = require('path');
const fs = require('fs');

const secretsPath = path.resolve(__dirname, '../../secrets', 'metamask-acct1-udemy.txt');

const secretWords = fs.readFileSync(secretsPath, 'utf8');

// Which account we want to unlock
// Specify what outside node or api we want to connect to
// Add account mnemonic, but instead its been hidden in a local dir
const provider = new HDWalletProvider(
  secretWords,
  'https://rinkeby.infura.io/8C5763b17wcbkLRZ5BFB'
);

const web3 = new Web3(provider);

// Two pieces of async code cannot use await outside of a function
// Writing a function to use async syntax
// Get a list of accounts unlocked
// Console log to specify which acct to deploy from
// Deploy dot specifies what to send
// Send dot specifies how much gas, which acct
const deploy = async () => {
  const accounts = await web3.eth.getAccounts();

  console.log('Attempting to deploy from account', accounts[0] );

  const result = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({ data: bytecode, arguments: ['Hi there!'] })
    .send({ gas: '1000000', from: accounts[0] });

  console.log('Contract deployed to', result.options.address);
};
deploy();
