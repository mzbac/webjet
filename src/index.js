import { Provider } from 'react-redux';
import React from 'react';
import { render } from 'react-dom';
import 'rxjs';
import App from './client/App';
import store from './client/configureStore';

render(
  <Provider store={store} >
    <App />
  </Provider>, document.getElementById('main'));
