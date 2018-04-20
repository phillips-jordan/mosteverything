import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";

class Btn extends Component {
  render() {
    return (
      <button className="btn" onClick={this.props.onClick}>
        {this.props.val}
      </button>
    );
  }
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      btns: Array(9).fill(null),
      playerXTurn: true
    };
  }
  clickler = i => {
    const btns = this.state.btns.slice();
    if (this.gameEnd(btns) || btns[i]) {
      return;
    }
    btns[i] = this.state.playerXTurn ? "X" : "O";
    this.setState({
      btns: btns,
      playerXTurn: !this.state.playerXTurn
    });
  };
  renderBtn(i) {
    return <Btn val={this.state.btns[i]} onClick={() => this.clickler(i)} />;
  }
  gameEnd(btns) {
    const winCons = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];
    for (let i = 0; i < winCons.length; i++) {
      const [a, b, c] = winCons[i];
      console.log(btns);
      if (btns[a] && btns[a] === btns[b] && btns[a] === btns[c]) {
        return btns[a];
      }
    }
    return null;
  }

  render() {
    const winner = this.gameEnd(this.state.btns);
    console.log(winner);
    let turn;
    if (winner) {
      turn = "Winner is " + winner;
    } else {
      turn = (this.state.playerXTurn ? "X" : "O") + "s Turn";
    }
    return (
      <div className="holder">
        <div id="turn">{turn}</div>
        <div>
          {this.renderBtn(0)}
          {this.renderBtn(1)}
          {this.renderBtn(2)}
        </div>

        <div>
          {this.renderBtn(3)}
          {this.renderBtn(4)}
          {this.renderBtn(5)}
        </div>
        <div>
          {this.renderBtn(6)}
          {this.renderBtn(7)}
          {this.renderBtn(8)}
        </div>
      </div>
    );
  }
}

export default App;
