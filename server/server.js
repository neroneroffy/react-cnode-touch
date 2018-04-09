const express = require("express");
const ReactSSR = require("react-dom/server");
const favicon = require("serve-favicon");
const fs = require("fs");
const path = require("path");
const bodyParser = require('body-parser');
const session = require('express-session');
const isDev = process.env.NODE_ENV === "development";
const app = express();
app.use(bodyParser.json());// 将json请求的数据格式转换为body的数据
app.use(bodyParser.urlencoded({ extended:false }));// 将表单数据转换为body数据
app.use(session({
  maxAge: 10 * 60 * 1000,
  name: 'tid',
  resave:false,
  saveUninitialized:false,
  secret:'react cnode class'
}))
app.use(favicon(path.join(__dirname,"../favicon.ico")));
app.use('/api/user',require('./util/handle-login'));
app.use('/api',require('./util/proxy'));

if(!isDev){
    //如果不是开发环境
    const serverEntry = require("../dist/server-entry").default;
    const template = fs.readFileSync(path.join(__dirname,"../dist/index.html"),"utf8")
    app.use("/public",express.static(path.join(__dirname,"../dist")));
    app.get("*",function (req,res) {
        const appString = ReactSSR.renderToString(serverEntry);
        res.send(template.replace("<!--app-->",appString))
    });

}else{
    const devStatic = require("./util/dev.static");
    devStatic(app)
}

app.listen(3333,function () {
    console.log("server is listening on 3333")
})




