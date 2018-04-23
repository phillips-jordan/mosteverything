import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";

class App extends Component {
  constructor() {
    super();
    this.state = { timer: 0 };
    setInterval(() => {
      this.state.timer > 0
        ? this.setState({ timer: this.state.timer - 1 })
        : (this.state.timer = 0);
    }, 1000);
  }
  click = () => {
    let val = document.getElementById("inp").value;
    val < 0 ? (val = 0) : val;
    this.setState({ timer: val });
    document.getElementById("inp").value = "";
  };
  render() {
    return (
      <div>
        <div>{this.state.timer}</div>
        <input type="number" id="inp" />
        <button onClick={this.click}>COUNTDOWN</button>
      </div>
    );
  }
}

export default App;
