import '@babel/polyfill';
import React from 'react';
import ReactDOM from 'react-dom';

//import App from './App/App';

import(/* webpackChunkName: "app" */ './App/App')
  .then(({ default: App }) => 
    ReactDOM.render(
      <App />,
      document.getElementById('root')
    )
  )