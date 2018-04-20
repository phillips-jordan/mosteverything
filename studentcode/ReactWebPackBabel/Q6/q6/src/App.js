import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';


class App extends Component {
  constructor(){
    super();
    this.state = {arr:[]}
  }
  go = (a, i) => {
      return <li key={i}>{a}</li>;
    };
  click = () => {
    let val = document.getElementById('inp').value;
    this.setState({arr: this.state.arr.concat(val)})
    val = document.getElementById("inp").value = '';
  }
  render() {
    return (<div><div>WOW, WHAT A LIST?!
    </div>
      <input type='text' id='inp'></input>
      <button onClick={this.click}>MAKE LIST</button>      
      <ul>
        {this.state.arr.map(this.go)}
        </ul>
      </div>)
  }
}

export default App;
