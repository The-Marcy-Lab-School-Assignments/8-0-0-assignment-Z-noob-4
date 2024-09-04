const express = require('express'); // used to configure the express server
const app = express(); // The `app` object configures the server
const waterAndSongs = require('./waterAndSongs.json');

// controllers
const serveIndex = (req, res, next) => {
  res.sendFile(__dirname + '/index.html');
}
const serveAbout = (req, res, next) => {
  res.send(`
    <h1>About</h1>
    <h2>You can search for topics on water or songs</h2>
    <h3>Topics:</h3>
    <li><a href="/api/search/?filter=water">/api/search/?filter=water</a></li>
    <li><a href="/api/search/?filter=songs">/api/search/?filter=songs</a></li>
    <li><a href="/api/data">See full data</a></li>
    <li><a href="/">Or go back to home page</a></li>
  `);
};
const serveSearch = (req, res, next) => {
  const filterTerm = req.query.filter || res.send('<h1><a href="/about">Go to about first</a></h1>');
  const filteredData = Object.hasOwn(waterAndSongs, filterTerm) ? waterAndSongs[filterTerm] : '<h1><a href="/about">Go to about first</a></h1>'
  res.send(filteredData);
}
const serveData = (req, res, next) => {
  res.json(waterAndSongs); // Content-Type is set to application/json
  // res.send(waterAndSongs); // Content-Type will also be application/json, but this is inferred
}
// In most cases, especially when working with JSON APIs, res.json() is preferred for its explicitness, consistency, and safety in handling JSON responses.
// res.send('Hello World!'); // Content-Type: text/html or text/plain  =>  can be mistake to html

// endpoints
app.get('/', serveIndex);
app.get('/about', serveAbout);
app.get('/api/search', serveSearch);
app.get('/api/data', serveData);

// listen
const port = 8080;
app.listen(port, () => console.log(`listening at http://localhost:${port}`)); 