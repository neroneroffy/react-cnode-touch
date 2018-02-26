const path = require('path');
const HTML_WEBPACK_PLUGIN = require('html-webpack-plugin');
module.exports = {
    entry :{
        app : path.join(__dirname,"../client/app.js")
    },
    output : {
        filename: '[name].[hash].js',
        path:path.join(__dirname,"../dist"),
        publicPath: "/public"
    },
    module : {
        rules: [
            {
                test:/.jsx$/,
                loader: "babel-loader"
            },
            {
                test:/.js$/,
                loader: "babel-loader",
                exclude:[
                    path.join(__dirname,'../node_modules')
                ]
            }
        ]
    },
    plugins: [
        new HTML_WEBPACK_PLUGIN({
            template:path.join(__dirname,"../client/template.html")
        })
    ]
}