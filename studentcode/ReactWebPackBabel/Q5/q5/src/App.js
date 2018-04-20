import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(){
    super();
    this.state={a:true}
  }
  click = () => {
    this.setState({a: !this.state.a})    
  }
  render() {
    return this.state.a?(<div><button onClick={this.click}>WOW</button></div>):(<div><button onClick={this.click}>Crazy</button></div>)
  }
}

export default App;
