import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fontsource/public-sans';
import './css/styles.css'

import { Appindex } from './Appindex.js';
import { Provider } from 'react-redux';
import store from './Redux/store.js';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <Appindex/>
  </Provider>


);
