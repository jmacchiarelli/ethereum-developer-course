const path = require('path');
// helps us build path over to the inbox sol file
// using path for this to guarantee cross platform compatibility
// if windows or unix will generate a valid path

const fs = require('fs');
// file system

const solc = require('solc');
// require solc

const inboxPath = path.resolve(__dirname, 'contracts', 'Inbox.sol');
// generate a path to Inbox sol file
// pass in 3 portions of the path
// dirname here = inbox dir
// inbox/contracts/Inbox.sol

const source = fs.readFileSync(inboxPath, 'utf8');
// read in the contents of the file
// pass in inbox path and specify encoding


module.exports = solc.compile(source, 1).contracts[':Inbox'];
// pass in source code
// specify number of contracts we are trying to compile
// wrap compile call in a console log call
// log the output to tell us what the compiler is doing
// when you run in console: node compile.js
// log outputs properties: bytecode, interface / contract abi
// had us remove console log
// now going to export this big giant object
// just return details about inbox contract
// adding contracts property, key value pair of inbox
// makes it easier to test and deploy
