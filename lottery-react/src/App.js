import React, { Component } from 'react';
//import logo from './logo.svg';
import './App.css';
import web3 from './web3';
import lottery from './lottery';

// State is taking place inside the constructor
// Manager is an empty string, players is an empty array
class App extends Component {
  state = {
    manager: '',
    players: [],
    balance: ''
  };

// Get contract manager
// Get list of players
// Print the balance of the lottery using contract address
  async componentDidMount(){
    const manager = await lottery.methods.manager().call();
    const players = await lottery.methods.getPlayers().call();
    const balance = await web3.eth.getBalance(lottery.options.address);

    this.setState({ manager, players, balance });
  }

  render() {
    return (
      <div>
        <h2>Lottery Contract</h2>
        <p>This contract is managed by {this.state.manager}.
        There are currently {this.state.players.length} people entered competing to win {web3.utils.fromWei(this.state.balance, 'ether')} ether!
        </p>
      </div>
    );
  }
}

export default App;
