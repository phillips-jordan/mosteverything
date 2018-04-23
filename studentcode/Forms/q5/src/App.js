import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";

class App extends React.Component {
  constructor() {
    super();
    this.state = { fName: "", lName: "",form:"" };
  }

  handleFChange = event => {
    this.setState({ fName: event.target.value });
  };

  handleLChange = event => {
    this.setState({ lName: event.target.value });
  };
  handleForm = event => {
    this.setState({form: event.target.value})
    
  }
  handleSubmit = event => {
    alert("A name was submitted: " + this.state.fName + " " + this.state.lName);
    event.preventDefault();
    this.setState({ lName: "", fName:"" });
  };
  formSubmit = event => {
    alert('Thanks! The message was '+this.state.form.length+' characters')
    event.preventDefault();
    this.setState({form: ""})

  }
  clickHandler = () => {
    this.setState({ fName: "", lName: "",form: "" });
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
        <div>
          <form onSubmit={this.formSubmit}>
            <input type='text'
            value ={this.state.form}
            onChange={this.handleForm}
            />
            <input type='submit'value='Submit'/>
            </form>
          </div>
      </div>
    );
  };
}

export default App;
