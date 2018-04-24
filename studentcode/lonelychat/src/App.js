import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import App2 from './App2.js'

class App extends Component {
  constructor() {
    super();
    this.state = {
      inputCon: "",
      msgs: [],
      responses:['WOW','No way...','lol'],
      responsesTerry: ['I Hate this site lol','ugh...','When will it end?'],
      username: '',
      usernameSubmit: false,
      display:'block',
      display2:'none'
    };
  }
  handleSubmit = event => {
    console.log(";lasd");
    let content = this.state.inputCon;
    let newMsg = this.state.msgs.concat(this.state.username + ': ' + content);
      setTimeout(()=>{newMsg = newMsg.concat("ENEMY: "+ this.state.responses[
      Math.round(Math.random()*(2))
    ])
  this.setState({ msgs: newMsg, inputcon: '' });;
  event.preventDefault();
  }, 1200);

    this.setState({ msgs: newMsg });
    this.state.inputCon=''
    event.preventDefault();
  };
  handleChange = event => {
    this.setState({ inputCon: event.target.value });
  };
  nameSubmit = event => {
    this.setState({usernameSubmit: true})
  }
  nameChange = event => {
    this.setState({username:event.target.value})
  }
  showChat1 = event => {
    this.setState({ display: "block", display2: "none" });
  }
  showChat2 = event => {
    this.setState({display: 'none', display2: 'block'})
  }

  render() {
    let lify = ele => (<li>{ele}</li>);
    return <div className='body'>
        {!this.state.usernameSubmit ? <div>
            <form onSubmit={this.nameSubmit}>
              <input type="text" value={this.state.username} onChange={this.nameChange} />
              <input type="submit" />
            </form>
          </div> : 
          <div>
            <button onClick={this.showChat1}>1 </button>
            
            <button onClick={this.showChat2}>2</button>
            <div className="chatCont">

            <div style={{ display: this.state.display }}>
              <ul style={{ "list-style-type": "none" }}>
                <li> {this.state.username + ": "} HELO</li>
                <li>ENEMY: helo</li>
                {this.state.msgs.map(lify)}
              </ul>
              <form onSubmit={this.handleSubmit}>
                <input type="text" value={this.state.inputCon} onChange={this.handleChange} />
                <input className='sub' type="submit" />
              </form>
            </div>
            </div>
            <App2 show={this.state.username} disp={this.state.display2} />
          </div>}
      </div>;
  }
}



export default App;
