const axios = require('axios');
const webpack = require("webpack");
const MemoryFs = require("memory-fs");
const path = require("path");
const ReactDomServer = require("react-dom/server");
const proxy = require("http-proxy-middleware");
const serverConfig = require("../../build/webpack.config.server");
const getTemplate = ()=>{
    return new Promise((resolve,reject)=>{
        axios.get("http://localhost:8888/public/index.html")
            .then(res =>{
                resolve(res.data)
            })
            .catch(reject)
    })
};
const Module = module.constructor;
const mfs = new MemoryFs;//创建mfs，从内存中读取bundle
const serverCompiler = webpack(serverConfig);
serverCompiler.outputFileSystem = mfs;
let serverBundle;
serverCompiler.watch({},(err,status)=>{
    if(err) throw err;
    status = status.toJson();
    status.errors.forEach( err=>console.error(err) );
    status.warnings.forEach( warn=>console.warn(warn));
    const bundlePath = path.join(
        serverConfig.output.path,
        serverConfig.output.filename
    )
    const bundle = mfs.readFileSync(bundlePath,"utf-8");
    const m = new Module();
    m._compile(bundle,"server-entry.js");
    serverBundle = m.exports.default
})
module.exports=function devStatic(app) {
    app.use("/public",proxy({
        target:"http://localhost:8888"
    }))
    app.get("*",function (req,res) {
        getTemplate().then(template=>{
            const content = ReactDomServer.renderToString(serverBundle);
            res.send(template.replace("<!--app-->",content))
        })
    })
};