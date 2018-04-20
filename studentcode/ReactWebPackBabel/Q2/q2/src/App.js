import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';


class App extends Component {
  constructor(){
    super();
    this.state={boo: true}
    
  }
  click = () => {
   this.setState({boo: !this.state.boo})
  }
  render() {
    return (
      <div>
      <button onClick={this.click}>{!this.state.boo?"HELLO":"OH NO!"}</button>
      </div>
  )
  }
}

export default App;
