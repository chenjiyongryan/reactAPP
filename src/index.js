import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { createStore, applyMiddleware, compose } from "redux";
import { Provider } from "react-redux";
import { counter ,addGun,removeGun,addGunAsync} from "./index.redux";
import thunk from "redux-thunk";
const store = createStore(
  counter,
  compose(
    applyMiddleware(thunk),
    window.devToolsExtension ? window.devToolsExtension() : () => {}
  )
);

//把这个store传给APP这个组件，这是个根组件
render()
function render (){
ReactDOM.render(
  //Provider里面，只把store传进去就行
  <Provider store={store}>
    <App  store={store} addGun={addGun} removeGun={removeGun} addGunAsync={addGunAsync}/>
  </Provider >,
  document.getElementById("root")
);

}
//store改变时触发,如果使用react-redux，使用Provider可以忘记这个
store.subscribe(render);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
