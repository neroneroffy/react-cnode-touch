const express = require('express');
const ReactSSR = require('react-dom/server');
//因为server-entry中使用的是commonjs2规范export default,而node.js中使用的是require引用，会把暴露出来的全部引用进来，所以要加default
const serverEntry = require('../dist/server-entry').default;
const fs = require('fs');
const path = require('path');
//读取html模板
const template = fs.readFileSync(path.join(__dirname,'../dist/index.html'),"utf8");
const app = express();
//区分哪些请求该返回静态文件
app.use('/public',express.static(path.join(__dirname,'../dist')))
app.get("*",function (req,res) {
    const appString = ReactSSR.renderToString(serverEntry);

    res.send(template.replace("<app></app>",appString));
});

app.listen("3333",function () {
    console.log("server is listening 3333")
});