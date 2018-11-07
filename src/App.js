import React, { Component } from 'react';
import { List,Button,NavBar, Icon } from 'antd-mobile';
import 'antd-mobile/dist/antd-mobile\.css';  // or 'antd-mobile/dist/antd-mobile.less'
import './App.css';
import { connect } from "react-redux";

// import lib from '@babel/code-frame';

/**
 * this指向三种方式：
 *  1.在定义函数的地方使用箭头函数 fn1 = ()=>{}
 *  2.在dom标签上使用箭头函数 onClick={()=>this.addMember()}
 *  3.在构造器里使用bind(this)  this.addMember = this.addMember.bind(this)
 * state里的数据不能直接改变，需要通过setState方法来进行重新赋值
 * 传值通过props，在子组件的引用标签上直接赋值，在子组件内部通过this.props.xxx来访问
 * 可能很多表达式的地方都需要加花括号{}
 * 在render编译标签里可以使用js代码
 */
const Item = List.Item;
const Brief = Item.Brief;

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      boss:'大壮'
    }
  }
  render() {

    //这里写JSX语法，
    const store = this.props.store
    const addGun = this.props.addGun
    const removeGun = this.props.removeGun
    const addGunAsync = this.props.addGunAsync
    

    const boss = '李云龙'  //这里不能加逗号
    return (   //如果有多行标签，必须用括号包起，最外层是一个div，这似乎是固定写法
    <div className="parent">
      <NavBar mode="light" icon={<Icon type={'left'} ></Icon>} rightContent={[
        <Icon key="0" type="search" style={{ marginRight: '16px' }} />,
        <Icon key="1" type="ellipsis" />,
      ]}></NavBar>
      <p>独立团现在有机枪{store.getState()}把</p>
      <Button  inline size="small" type="primary" onClick={()=>{
        store.dispatch(addGun())
      }}>扩充军备 </Button>
      <Button  inline size="small" type="primary" onClick={()=>{
        store.dispatch(addGunAsync())
      }}>拖两天再给 </Button>
      <Button  inline size="small" type="warning" onClick={()=>{
        store.dispatch(removeGun())
      }}>削减军备 </Button>
      <Button type="primary" onClick={this.changeNickName}>给他们起个外号</Button>
      <Children1 boss={this.state.boss}></Children1>  
      <Children2 boss="李大锤"></Children2>  
    </div>
    )
  }
  changeNickName = ()=>{
    this.setState({
      boss:'大大大大壮'
    })
  }
}
App = connect()(App) //装饰器
//组件命名必须以大写开头，比如这个Children1
class Children1 extends Component {
  //构造函数，这里是组建内部的state，初始化的时候就会创建，类似vue里的Data
  constructor(props){
    super(props)  //不要忘了写super()，这类似于call
    this.state = {
      // 初始data可以统一写在这里
      member:['虎子','柱子','二哈'],
      ages:[29,23,34],
      someData:'abc',
    }
    
    this.addMember = this.addMember.bind(this) //绑定this指向，使其始终等于当前页面的this
    console.log('组件初始化>>>')
  }
  //函数定义的地方和构造器等同级别，可以使用箭头函数以避免this指向的问题
  addMember(){
    //注意，这里可能会有this指向问题
    this.setState({
      member:[...this.state.member,'新兵蛋子'+(Math.random()*2).toFixed(2)]
    })
    this.setState({
      someData:'ABC'
    })
    console.log('this>>>',this)
  }
  
  //生命周期钩子函数
  componentWillMount(){console.log('组件马上就要挂载了>>>')}
  componentDidMount(){console.log('组件已经挂载了>>>')}
  componentWillReceiveProps(){console.log('组件就要接受父组件的值了>>>')}
  shouldComponentUpdate(){console.log('判断是不是要更新组件>>>');return true}
  componentWillUpdate(){console.log('马上就要更新组件了>>>')}
  componentDidUpdate(){console.log('组件更新完毕了>>>')}
  componentWillUnmount(){console.log('组件卸载了>>>')}
  render() {
    // const age = 20
    //这里写JSX语法，
    return (
      //通过this.props.key获取父组件传过来的数据
      <div className="child1">
        <List renderHeader={() => '一营营长'+this.props.boss}>
          {this.state.member.map(v=>{
            return <Item key={v}>{v}</Item>
          })}
        </List>
        <Button onClick={()=>this.addMember()}>添加成员</Button>
      </div>
    
    )
  }
}
//如果组件里不需要render函数，可以简写成这样
function Children2 (props){
  return (<h3 className="child2">二营营长是{props.boss},有0个成员</h3>)
}

export default App;
