import React, { Component } from 'react';
import './App.css';
import LineGraph from "./components/LineGraph";
import Modal from "./components/Modal";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      error: "",
      stockPrices: [],
      stockData: [],
      stockName: "MSFT"
    }

    this.closeModal = this.closeModal.bind(this);
    this.openModal = this.openModal.bind(this);
  }

  changeStock = (e) => {
    this.setState({
      stockName: e.target.value
    })
  }

  closeModal() {
    this.setState({error: ""});
  }

  openModal() {
    this.setState({error: "Test Error"});
  }

  checkStock = () => {
    if(this.state.stockName.trim()) {
      fetch(`https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${this.state.stockName}&apikey=${process.env.REACT_APP_API_KEY}`)
      .then(res => res.json())
      .then((data) => {
        if("Error Message" in data) {
          this.setState({
            error: `Please verify that ${this.state.stockName} is a valid stock symbol.`
          })
        } else if ("Note" in data) {
          this.setState({
            error: "Too many requests have been sent, please wait a moment before searching again."
          })
        } else {
          this.setState({
            stockData: data["Time Series (Daily)"],
          })
        }
      })
    }
  }

  test = () => {
    fetch(`https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=MSFT&apikey=demo`)
    .then(res => res.json())
    .then((data) => {
      this.setState({
        stockData: data["Time Series (Daily)"],
      })
    })
  }

  render() {
    return (
      <div className="App">
        <Modal closeModal={this.closeModal} error={this.state.error} />
        <header className="App-header">
          <input className="App-input" maxLength={5} onChange={this.changeStock} value={this.state.stockName} />
          <button className="App-button" onClick={this.checkStock}>Check Stock</button>
        </header>
        <LineGraph height={700} width={1500} stockData={this.state.stockData} />
      </div>
    );
  }
}

export default App;
