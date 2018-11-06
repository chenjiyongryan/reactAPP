//require是node的写法，
const express = require("express");//nodeJs库
const mongoose = require("mongoose"); //方便操作mongoDB的js库

//链接mongo，并且使用imooc这个集合,没有这个路径的话会新建·
const DB_URL = "mongodb://127.0.0.1:27017/imooc";
mongoose.connect(DB_URL);
mongoose.connection.on("connected", function() {
  console.log("mongo connect  success!");
});

//mongdodb类似于mysql的表的，mongodb里有文档，字段的概念
const User = mongoose.model(
  "user",
  new mongoose.Schema({
    user: { type: String, require: true },
    age: { type: Number, require: true },
    sex:{type:String,require:false}
  })
);

//创建
User.create({
    user:'chenjiyong',
    age:27,
    sex:'Male'
},function(err,doc){
    if(!err){
        console.log(doc)
    }else{
        console.log(err)
    }
})
//创建
User.create({
    user:'xiaoming',
    age:12
},function(err,doc){
    if(!err){
        console.log(doc)
    }else{
        console.log(err)
    }
})
//新建 app
const app = express();
app.get("/", function(req, res) {
  res.send('<h1 style="color:red;">hello world</h1>'); //返回文本
  
});
//获取数据
app.get("/data", function(req, res) {
    User.find({},function(err,doc){
        res.json(doc)
    })
});
//只获取一条数据
app.get("/dataOnlyOne", function(req, res) {
    User.findOne({},function(err,doc){
        res.json(doc)
    })
});
//删除数据
app.get("/delete", function(req, res) {
    User.remove({age:27},function(err,doc){
        res.json({msg:'删除成功',doc})
    })
//   res.json({ name: "ryan", age: "27" }); //返回json
});
//更新数据
app.get("/update", function(req, res) {
    debugger;
    User.update({'user':'xiaoming'},{'$set':{age:26}},function(err,doc){
        res.json({msg:'更新成功',doc})
    })
//   res.json({ name: "ryan", age: "27" }); //返回json
});
app.listen(9093, function() {
  console.log("Hi NodeJS 9093>>>");
});
