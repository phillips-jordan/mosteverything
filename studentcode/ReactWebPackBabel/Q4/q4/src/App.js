import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.num = Math.round(Math.random()*(99)+1)
  }
  click = () => {
    let data =  document.getElementById('inp').value
    data==this.num? alert('You Have Guessed Correctly'):data>this.num? alert('You Guess Is Too High') : alert('Your Guess Is Too Low')
  }
  render() {
    return (
      <div>
        <input type='text' id='inp'></input>
        <button onClick={this.click}>GUESS</button>
        </div>
    );
  }
}

export default App;
