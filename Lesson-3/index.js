import React from 'react';
import ReactDOM from 'react-dom'; // glue between React and the DOM
import App from './containers/App';
import './index.css';
import robotsSearch from './reducers'
import { createStore } from 'redux'
import { Provider } from 'react-redux'


const store = createStore(robotsSearch)

ReactDOM.render(
  <Provider store={store}>
    <App/>
  </Provider>,
  document.getElementById('root')
);
