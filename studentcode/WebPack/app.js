import React from 'react'
import ReactDOM from 'react-dom'
let oneLinerJoke = require('./node_modules/one-liner-joke/index.js');


let rootdiv = document.getElementById('root');

class Joker extends React.Component {
  constructor() {
    super();
    this.state = { jok: oneLinerJoke.getRandomJoke().body};
  }
  render() {return React.createElement("div", { id: "joke" }, this.state.jok, React.createElement("br", null), React.createElement("button", { onClick: () => {
                    this.setState({
                      jok: oneLinerJoke.getRandomJoke().body
                    });
                  } }, "n e w - j o k e"));
            }
  }

ReactDOM.render(React.createElement(Joker, null), rootdiv)