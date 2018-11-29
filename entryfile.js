import React from 'react';
import { render } from 'react-dom';

class Hello extends React.Component {
  render() {
    return <h1>Hello, {this.props.name}</h1>;
  }
}

// accept a name for example and a domNode where to render
function renderIt(name, domNode) {
  render(<Hello name={name} />, domNode);
}

window.renderIt = renderIt;