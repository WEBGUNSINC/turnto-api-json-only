const express = require('express'); // import express module (simplifies routing/requests, among other things)
const app = express(); // create an instance of the express module (app is the conventional variable name used)
const fetch = require('node-fetch'); // import node-fetch (enables the fetch API to be used server-side)
const PORT = process.env.PORT || 5000; // use either the host env var port (PORT) provided by Heroku or the local port (5000) on your machine
const ttapitok = process.env.ttbearer

app.get('/', (req, res) => { 
  var sku = req.query.sku;
  // send a get request to root directory ('/' is this file (app.js))
  fetch('https://api.turnto.com/v1.2/reviews?sku='+sku, {
    method: 'GET',
    headers: { 'Authorization': 'bearer ' + ttapitok}
  }) // fetch TT reviews
    .then(res => res.json()) // return a promise containing the response
    .then(json => res.send(json))
     // extract the JSON body content from the response and sends it to the client
    .catch(function(err){ // catch any errors
      console.log(err); // log errors to the console
    })
})

app.listen(PORT, () => { // start server and listen on specified port
  console.log(`App is running on ${PORT}`) // confirm server is running and log port to the console
}) 
