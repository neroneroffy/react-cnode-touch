const path = require('path');
const HTMLPlugin = require('html-webpack-plugin');
const isDev = process.env.NODE_DEV === "development";

const config = {
    entry:{
        app:path.join(__dirname,"../client/index.js")
    },
    output:{
        filename:"[name].[hash].js",
        path:path.join(__dirname,"../dist"),
        publicPath:"/public"
    },
    module:{
        rules:[
            {
                test:/\.js$/,
                loader:"babel-loader",
                exclude:[
                    path.join(__dirname,"../node_modules")
                ]
            }
        ]
    },
    plugins:[
        new HTMLPlugin({
            template:path.join(__dirname,"../client/template.html")
        })
    ]
};

if(isDev){
    config.devServer = {
        host:"0.0.0.0",
        port :"8888",
        contentBase:path.join(__dirname,"../dist"),
        //hot:true,
        overlay:{
            errors:true
        },
        publicPath:"/public",
        historyApiFallback:{
            //所有404的请求都返回index.html
            index:"/public/index.html"
        }
    }
};
module.exports = config