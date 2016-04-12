import express from 'express';
const app = express();


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
    res.sendFile(__dirname + '/build/app.js');

});

// Serve aggregate stylesheet depending on environment
app.get('/css/styles.css', (req, res) => {

    res.sendFile(__dirname + '/build/css/styles.css');
  
});

app.get('/favicon.png', (req, res) => {

    res.sendFile(__dirname + '/build/favicon.png');
  
  
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
