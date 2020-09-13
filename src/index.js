import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {createStore} from 'redux'
import { Provider } from 'react-redux'

const initialState={
  users:{
    name:'abc'
  }
}


const reducer = (state=initialState,action)=>{
  switch(action.type){
    case 'UPDATE':
      return(state=action.payload)
    default:
      return state
  }
}

const store=createStore(reducer)

store.subscribe(()=>{
  console.log('updated store', store.getState())
})


ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();