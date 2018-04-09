const express = require("express");
const ReactSSR = require("react-dom/server");
const favicon = require("serve-favicon");
const fs = require("fs");
const path = require("path");
const isDev = process.env.NODE_ENV === "development";
const app = express();
app.use(favicon(path.join(__dirname,"../favicon.ico")))
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




