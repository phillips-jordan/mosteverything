let rootdiv = document.getElementById('root');
let elements = React.createElement(
  'div',
  null,
  React.createElement('a', { href: 'www.google.com' }),
  React.createElement(
    'div',
    { id: 'somedivid' },
    'some div'
  ),
  '\''
);
ReactDOM.render(elements, rootdiv);
