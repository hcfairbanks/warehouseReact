import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { createStore, applyMiddleware,compose} from 'redux';
import { Provider } from 'react-redux'
import combineReducers from './reducers/index'
import thunk from 'redux-thunk';
import logger from 'redux-logger'

const store = createStore(combineReducers,compose( applyMiddleware(thunk, logger)))

const app = (
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App/>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);

ReactDOM.render(
  app,document.getElementById('root')
);

serviceWorker.unregister();