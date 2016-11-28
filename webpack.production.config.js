var webpack = require('webpack');

/**
 * This is the Webpack configuration file for production.
 */
module.exports = {

   // Efficiently evaluate modules with source maps
  devtool: "eval", 
  
  entry: "./src/main",

  output: {
    path: __dirname + "/build/",
    filename: "app.js"
  },

  module: {
    loaders: [
      { test: /\.jsx?$/, exclude: /node_modules/, loader: "babel-loader" }
    ]
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': '"production"'
  })
  ],

  resolve: {
    extensions: ['', '.js', '.jsx']
  }
}
