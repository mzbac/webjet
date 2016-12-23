import React, { Component, PropTypes } from 'react';
import 'whatwg-fetch';
import styles from './index.css';

class App extends Component {
  constructor() {
    super();
    fetch('/movies')
      .then(res => {
        console.log(res)
        console.log(res.json());
      });
  }

  render() {
    const {} = this.props;
    return (
      <div></div>
    );
  }
}
App.propTypes = {};
export default App;
