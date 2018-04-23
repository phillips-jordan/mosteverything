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

        <button onClick={this.clickHandler}>RESET FORM</button>
      </div>
    );
  };
}

export default App;
