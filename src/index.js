import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { createStore } from "redux";
import { counter } from "./index.redux";
const store = createStore(counter)

//把这个store传给APP这个组件，这是个根组件
function render(){
    ReactDOM.render(<App store={store} />, document.getElementById('root'));
}
render()

//store改变时触发
store.subscribe(render);
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
