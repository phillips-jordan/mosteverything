import React from "react"
import ReactDOM from "react-dom"


let rootdiv= document.getElementById('root');

let newh1 = React.createElement('h1', null, 'HELLO WORLD')
ReactDOM.render(newh1,rootdiv)