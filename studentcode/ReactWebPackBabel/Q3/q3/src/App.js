import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(){
    super();
    this.value = ''
  }
  click = ()=>{
    this.value = document.getElementById('texto').value
    this.value==42?alert('You Have Guess Correctly!'):alert('WRONG! Try To Guess again')
  }
  render() {
    return (<div><div>Try to guess the number</div>
          <input type='text' id='texto'></input>
          <button onClick={this.click}>submit</button>
      </div>
    )
  }
}

export default App;
