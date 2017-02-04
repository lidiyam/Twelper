var express = require('express')
var app = express()
var bodyParser = require('body-parser')
var yelpCreds = require('./yelpSecret');
var yelp = require('yelp-fusion');

var clientId = yelpCreds.clientId;
var clientSecret = yelpCreds.clientSecret;

app.use(bodyParser())

app.get('/destinations/:city/:num',function(req,res) {
	var searchRequest = {
		//why is this filter not working?????
		category_filter: 'tours',
		location: req.params.city,
		limit: req.params.num
	};

	yelp.accessToken(clientId, clientSecret).then(response => {
	  var client = yelp.client(response.jsonBody.access_token);

	  client.search(searchRequest)
	  .then(response => {
	    var Result = response.jsonBody.businesses;
	    var prettyJson = JSON.stringify(Result, null, 4);
	    console.log(prettyJson);
	  });
		}).catch(e => {
		  console.log(e);
		});

});

app.get('/', function (req, res) {
  res.send('Hello World!')
})

app.listen(8000, function () {
  console.log('Example app listening on port 8000!')
})