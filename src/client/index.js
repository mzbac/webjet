import React, { Component, PropTypes } from 'react';
import 'whatwg-fetch';
import Rx from 'rxjs/Rx';
import styles from './index.css';

class App extends Component {
  constructor() {
    super();
    const clickObservable = Rx.Observable
      .fromEvent(document, 'click')
      .switchMap(click => Rx.Observable.fromPromise(() =>
        fetch('http://webjetapitest.azurewebsites.net/api/filmworld/movies', {
          method: 'GET',
          headers: {
            'x-access-token': 'sjd1HfkjU83ksdsm3802k'
          },
        }).then(res => res.json())
      ));

    fetch('http://webjetapitest.azurewebsites.net/api/filmworld/movies', {
      method: 'GET',
      headers: {
        'x-access-token': 'sjd1HfkjU83ksdsm3802k',
        'Access-Control-Request-Headers': 'Content-Type',
        'Content-Type': 'application/json',
      },
    })
      .then(res => {
        console.log(res)
        console.log(res.json());
      })
    const subscription = clickObservable.subscribe(
      function (x) {
        debugger;
        console.log('Next: ' + x);
      },
      function (err) {
        console.log('Error: ' + err);
      },
      function () {
        console.log('Completed');
      });
  }

  render() {
    const {} = this.props;
    return (
      <div>
      </div>
    );
  }
}
App.propTypes = {};
export default App;
