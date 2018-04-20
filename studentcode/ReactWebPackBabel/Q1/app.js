import React from 'react'
import ReactDOM from 'react-dom'

class App extends Component {
  render() {
    return <div> Hello World! </div>;
  }
}
var rootdiv = document.getElementById("root");
ReactDOM.render(<App />, rootdiv);
