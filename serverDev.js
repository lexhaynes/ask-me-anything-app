var express = require('express');
var app = express();


/************************************************************
 *
 * Express routes for:
 *   - app.js
 *   - style.css
 *   - index.html
 *
 ************************************************************/

// Serve application file depending on environment
console.log('node env', process.env.NODE_ENV)
app.get('/app.js', (req, res) => {
  if (process.env.PRODUCTION || process.env.NODE_ENV === "production") {
    res.sendFile(__dirname + '/build/app.js');
  } else {
    res.redirect('//localhost:9090/build/app.js');
  }
});

// Serve aggregate stylesheet depending on environment
app.get('/css/styles.css', (req, res) => {
  if (process.env.PRODUCTION || process.env.NODE_ENV === "production") {
    res.sendFile(__dirname + '/build/css/styles.css');
  } else {
    res.redirect('//localhost:9090/build/css/styles.css');
  }
});

app.get('/favicon.png', (req, res) => {
  if (process.env.PRODUCTION || process.env.NODE_ENV === "production") {
    res.sendFile(__dirname + '/build/favicon.png');
  } else {
    res.redirect('//localhost:9090/build/favicon.png');
  }
});

// Serve index page
app.get('*', (req, res) => {
  res.sendFile(__dirname + '/build/index.html');
});


/*************************************************************
 *
 * Webpack Dev Server
 *
 * See: http://webpack.github.io/docs/webpack-dev-server.html
 *
 *************************************************************/

if (!process.env.PRODUCTION || process.env.NODE_ENV !== "production") {
  const webpack = require('webpack');
  const WebpackDevServer = require('webpack-dev-server');
  const config = require('./webpack.local.config');

  new WebpackDevServer(webpack(config), {
    publicPath: config.output.publicPath,
    hot: true,
    noInfo: true,
    historyApiFallback: true
  }).listen(9090, 'localhost', (err, result) => {
    if (err) {
      console.log(err);
    }
  });
}


/******************
 *
 * Express server
 *
 *****************/

const port = process.env.PORT || 8080;
const server = app.listen(port, () => {
  const host = server.address().address;
  const port = server.address().port;

  console.log('Essential React listening at http://%s:%s', host, port);
});
