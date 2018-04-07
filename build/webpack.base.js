const path = require('path');
module.exports={
  output:{
    path:path.join(__dirname,"../dist"),
    publicPath:"/public/",
  },
  module:{
    rules:[
      {
        enforce: "pre",
        test:/.(js|jsx)$/,
        loader:"eslint-loader",
        exclude:[
          path.resolve(__dirname,'../node_modules')
        ]
      },

      {
        test:/\.js$/,
        loader:"babel-loader",
        exclude:[
          path.join(__dirname,"../node_modules")
        ]
      }
    ]
  }
}
