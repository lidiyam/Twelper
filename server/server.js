var express = require('express')
var app = express()
var bodyParser = require('body-parser')
var yelpCreds = require('./yelpSecret');
var yelp = require('yelp-fusion');
var uberCreds = require('./uberSecret');
var Uber = require('node-uber');

var clientId = yelpCreds.clientId;
var clientSecret = yelpCreds.clientSecret;

app.use(bodyParser())

//test example
var searchRequest = {
	//why is this filter not working?????
	category_filter: 'tours',
	location: 'san francisco, ca',
	limit:10
};

yelp.accessToken(clientId, clientSecret).then(response => {
  var client = yelp.client(response.jsonBody.access_token);

  client.search(searchRequest).then(response => {
    var Result = response.jsonBody.businesses;
    var prettyJson = JSON.stringify(Result, null, 4);
    console.log(prettyJson);
  });
}).catch(e => {
  console.log(e);
});

var uber = new Uber({
  client_id: uberCreds.clientIdUber,
  client_secret: uberCreds.clientSecretUber,
  server_token: uberCreds.serverToken,
  redirect_uri: 'http://localhost:8000/api/callback',
  name: 'Twelper',
  language: 'en_US', // optional, defaults to en_US
  sandbox: true // optional, defaults to false
});

uber.estimates.getPriceForRoute(3.1357, 101.6880, 3.0833, 101.6500, function (err, res) {
  if (err) console.error(err);
  else console.log(res);
});

app.get('/', function (req, res) {
  res.send('Hello World!')
})

app.listen(8000, function () {
  console.log('Example app listening on port 8000!')
})

