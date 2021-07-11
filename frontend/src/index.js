import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import './index.css';
import App from './App';
import store from './store';
import { bugAdded, bugResolved } from './actions/exampleActions';

// this function gets called everytime state of store changes
store.subscribe(() => {
  console.log("Store changed!", store.getState());
});

/*store.dispatch({
  type: "bugAdded",
  payload: {
    description: "Bug1"
  }
})*/

store.dispatch(bugAdded("Bug1"));

//console.log(store.getState());

store.dispatch(bugResolved("Bug1"))

store.dispatch({
  type: "bugRemoved",
  payload: {
    id: 1
  }
})

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
