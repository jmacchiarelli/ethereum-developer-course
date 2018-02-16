import React, { Component } from 'react';
//import logo from './logo.svg';
import './App.css';
import web3 from './web3';
import lottery from './lottery';

// State is taking place inside the constructor
class App extends Component {
  state = {
    manager: ''
  };

  async componentDidMount(){
    const manager = await lottery.methods.manager().call();

    this.setState({ manager });
  }

  render() {
    return (
      <div>
        <h2>Lottery Contract</h2>
        <p>This contract is managed by {this.state.manager}</p>
      </div>
    );
  }
}

export default App;
