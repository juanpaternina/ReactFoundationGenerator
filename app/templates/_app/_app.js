import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { store } from './store';
import { Route } from 'react-router';
import { ConnectedRouter } from 'react-router-redux';

import createHistory from 'history/createBrowserHistory'
import Main from './components/Main/Main.js'

const history = createHistory()

// Load foundation
$(document).foundation();

// App css
require('applicationStyles')

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <div>
        <Route exact path="/" component={Main}/>
      </div>
    </ConnectedRouter>
  </Provider>,
  document.getElementById('app')
);
