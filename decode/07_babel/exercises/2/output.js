let rootdiv = document.getElementById('root');

let list = React.createElement(
  'ul',
  null,
  React.createElement(
    'li',
    null,
    'cheese'
  ),
  React.createElement(
    'li',
    null,
    'bacon'
  ),
  React.createElement(
    'li',
    null,
    'milk'
  )
);
ReactDOM.render(list, rootdiv);
