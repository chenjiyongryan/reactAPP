//（这个文件暂时用不到）
//这是一个redux的基本形态
import React from "react";
import ReactDOM from "react-dom";
import { createStore } from "redux";

let store = createStore(counter);

//reducer
function counter(state = 0, action) {
  switch (action.type) {
    case "add":
      return state + 1;
      break;
    case "reduce":
      return state - 1;
      break;
    default:
      return 10
      break;
  }
}
//消息订阅，类似于watch，数据有变化时触发。tips：必须在dispatch之前执行
store.subscribe(()=>{
    console.log('现在的值是：',store.getState())
});

//消息派发，就是改变store里的数据
store.dispatch({type:'add'})
store.dispatch({type:'add'})
store.dispatch({type:'add'})

//获取数据，使用store.getState()方法
const data = store.getState()
console.log(data)

export { store };
