import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";

class App2 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputCon: "",
      msgs: [],
      responses:['WOW','No way...','lol'],
      responsesTerry: ['I Hate this site lol','ugh...','When will it end?'],
      username: this.props.show,
      usernameSubmit: true,
      display: this.props.disp
    };
  }
  handleSubmit = event => {
    let content = this.state.inputCon;
    let newMsg = this.state.msgs.concat(this.state.username + ': ' + content);
 
    setTimeout(() => {
      newMsg = newMsg.concat("TERRY: " + this.state.responsesTerry[Math.round(Math.random() * 2)]);
      this.setState({ msgs: newMsg });
      this.state.inputCon = "";
      event.preventDefault();
    }, 800);
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

  render() {
    let lify = ele => (<li>{ele}</li>);
    return (
      <div><div></div>
      {this.state.usernameSubmit?
        
     <div style={{display: this.props.disp }}>
        <ul style={{ "list-style-type": "none"}}>
          <li> {this.state.username+ ': '} HELO</li>
          <li>TERRY: ...  </li>
          {this.state.msgs.map(lify)}
        </ul>
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            value={this.state.inputCon}
            onChange={this.handleChange}
          />
          <input type="submit" />
        </form>
      </div>
      : 
      null
     }  
         </div>
    );
  }
}

export default App2;
