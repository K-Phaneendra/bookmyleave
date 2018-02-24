import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import combinedReducer from './reducers/combinedReducer';
import App from './App';

const store = createStore(combinedReducer, applyMiddleware(thunk));
const app = document.getElementById('root');

ReactDOM.render(<Provider store={store}><App /></Provider>, app);
