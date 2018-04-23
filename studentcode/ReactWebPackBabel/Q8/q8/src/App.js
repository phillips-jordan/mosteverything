import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";

class Btn extends Component {
  constructor(props) {
    super(props);
    this.state = { clicked: false, color: this.props.color };
  }
  click = () => {
    if (!this.state.clicked) {
      this.setState({ clicked: true });
      this.props.click();
      this.setState({ color: "darkred" });
    }
  };
  render() {
    return (
      <button
        className="but"
        style={{ "background-color": this.state.color }}
        onClick={this.click}
      >
        Enjoyable Assignment
      </button>
    );
  }
}

class App extends Component {
  constructor() {
    super();
    this.state = {
      buttons: [<Btn color="red" click={this.clickler} />],
      p: 2,
      n: 1
    };
  }
  clickler = () => {
    const { buttons, p, n } = this.state;
    let arr = buttons;
    let len = arr.length;
    this.setState({
      n: n + 1
    });
    if (buttons.length === n) {
      //IGNORE THIS
      if (buttons.length == 1) {
        arr.push(<Btn color="blue" click={this.clickler} />);
        arr.push(<Btn color="yellow" click={this.clickler} />);
        this.setState({
          buttons: arr,
          p: p + 1
        });
        // LOL
      } else {
        for (let i = 0; i < p; i++) {
          arr.push(
            <Btn
              color={"#" + Math.floor(Math.random() * 16777215).toString(16)}
              click={this.clickler}
            />
          );
        }
        this.setState({
          buttons: arr,
          p: p + 1
        });
      }
    }
  };
  render() {
    return <div className="holder">{this.state.buttons}</div>;
  }
}

export default App;
