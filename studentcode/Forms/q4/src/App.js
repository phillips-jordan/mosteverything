import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";

class App extends React.Component {
  constructor() {
    super();
    this.state = { fName: "", lName: "" };
  }

  handleFChange = event => {
    this.setState({ fName: event.target.value });
  };

  handleLChange = event => {
    this.setState({ lName: event.target.value });
  };
  handleSubmit = event => {
    alert("A name was submitted: " + this.state.fName + " " + this.state.lName);
    event.preventDefault();
  };
  clickHandler = () => {
    this.setState({ fName: "", lName: "" });
  };
  swappler = () => {
    let a = this.state.fName;
    let b = this.state.lName;
    this.setState({ fName: b, lName: a });
  };

  render = () => {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          FirstName:
          <input
            type="text"
            value={this.state.fName}
            onChange={this.handleFChange}
          />
          LastName:
          <input
            type="text"
            value={this.state.lName}
            onChange={this.handleLChange}
          />
          <input type="submit" value="Submit" />
        </form>

        {this.state.fName || this.state.lName ? (
          <button onClick={this.clickHandler}>RESET FORM</button>
        ) : null}
        <div>
          <button onClick={this.swappler}>SWAPPER</button>
        </div>
      </div>
    );
  };
}

export default App;
