import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import createHistory from 'history/createBrowserHistory'
import { createStore, applyMiddleware, compose } from 'redux';
import { routerMiddleware } from 'react-router-redux';

import reducer from '../reducers';

const loggerMiddleware = createLogger();
const history = createHistory()
const historyMiddleware = routerMiddleware(history)

export const store = createStore(
  reducer,
  undefined,
  compose(
    applyMiddleware(
        thunkMiddleware,
        loggerMiddleware,
        historyMiddleware,
    )
  )
)
