import React, { Component } from 'react';
import SushiContainer from './containers/SushiContainer';
import Table from './containers/Table';

// Endpoint!
const API = "http://localhost:3000/sushis"

class App extends Component {
  state = {
    sushis: [],
    currentSushiIndex: 0,
    money: 100
  }
  
  componentDidMount() {
    fetch(API)
      .then(response => response.json())
      .then(sushis => {
        this.setState({sushis: sushis.map(sushi => Object.assign({}, sushi, {eaten: false}))});
      })
  }
  
  getMoreSushi = () => {
    this.setState({currentSushiIndex: this.state.currentSushiIndex + 4})
  }

  buySushi = id => {
    const newSushis = [...this.state.sushis];
    const boughtSushiIndex = this.state.sushis.findIndex(sushi => sushi.id === id);
    const newSushi = newSushis.find(sushi => sushi.id === id);
    newSushi.eaten = true;
    newSushis.splice(boughtSushiIndex, 1, newSushi);
    this.setState({
      sushis: newSushis,
      money: this.state.money - newSushi.price
    });
  }

  getEmptyPlates = () => this.state.sushis.filter(sushi => sushi.eaten === true).length

  render() {
    return (
      <div className="app">
        <SushiContainer
          currentSushiIndex={this.state.currentSushiIndex}
          sushis={this.state.sushis}
          getMoreSushi={this.getMoreSushi}
          buySushi={this.buySushi}
          money={this.state.money}
        />
        <Table emptyPlates={this.getEmptyPlates} money={this.state.money} />
      </div>
    );
  }
}

export default App;