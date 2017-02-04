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
	    res.send(prettyJson);
	  });
		}).catch(e => {
		  res.send(e);
		});

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



app.get('/', function (req, res) {
  	res.send('Hello World!')
})


app.get('/api/routeInfo', function (req, res) {
	uber.estimates.getPriceForRoute(req.query.start_latitude, res.query.start_longitude, res.query.end_latitude, res.query.end_longitude, function (err, resp) {
	  if (err) console.error(err);
	  else {
	  	res.send(resp['prices'][0]);
	  }
	});
})


app.get('/api/findPath', function (req, res) {
	var start_lat = req.query.latitude
	var start_long = res.query.longitude

	var destinations = getTopDestinations(start_lat, start_long)
	var count = destinations.count

	var topPath = new Array()

	for (var i = 0; i < count; ++i) {
		var nextStop = findNextStop(start_lat, start_long, destinations)
		topPath.push(nextStop)
		destinations.remove(nextStop)
		start_lat = nextStop['latitude']
		start_long = nextStop['longitude']
	}

	res.send( topPath )
})



function findNextStop(start_lat, start_long, destinations) {
	var nextDest, bestScore = null;

	for (dest in destinations) {
		uber.estimates.getPriceForRoute(start_lat, start_long, dest['latitude'], dest['longitude'], function (err, resp) {
			if (err) console.error(err)
			else {
				var distance = resp['prices'][0]['distance']
				var costEstimate = resp['prices'][0]['high_estimate']
	  			var duration = resp['prices'][0]['duration']

	  			var score = (3*distance + 2*costEstimate + duration)

	  			if (nextDest == null) {
	  				nextDest = dest
	  				bestScore = score
	  			}
	  			else if (score < bestScore) {
	  				nextDest = dest
	  				bestScore = score
	  			}
			}
		})
	}
	return nextDest;
}



// find top destinations (yelp): returns an array of Objects with keys: latitude, longitude, city





app.listen(8000, function () {
  console.log('Example app listening on port 8000!')
})

