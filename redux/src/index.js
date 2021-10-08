import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import './index.css';
import App from "./App";

const reducer = (state = {value: 0}, action) => {
    switch (action.type) {
        case 'INCREASE':
            return { value: state.value + 1 };
        case 'DECREASE':
            return { value: state.value - 1 };
        default:
            return state;
    }
}

const store = createStore(reducer);

ReactDOM.render(
  <React.StrictMode>
      <Provider store={store} >
          <App />
      </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);