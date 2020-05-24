import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Provider } from 'react-redux';
import reducers from "./reducers/countryReducer";
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import TableTest from './TableTest.js';

let store = createStore(reducers, applyMiddleware(thunk));
ReactDOM.render(
  <TableTest />,
  document.getElementById('root')
);
