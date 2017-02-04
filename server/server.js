var express = require('express')
var app = express()
var bodyParser = require('body-parser')
var yelpCreds = require('./yelpSecret');
var yelp = require('yelp-fusion');
var uberCreds = require('./uberSecret');
var Uber = require('node-uber');
var Promise = require('promise');

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


app.get('/api/routeInfo/:start_latitude/:start_longitude/:end_latitude/:end_longitude', function (req, res) {
	uber.estimates.getPriceForRoute(req.params.start_latitude, req.params.start_longitude, req.params.end_latitude, req.params.end_longitude, function (err, resp) {
	  if (err) console.error(err);
	  else {
	  	res.send(resp['prices'][0]);
	  }
	});
})


app.get('/api/findPath/:latitude/:longitude/:city/:num', function (req, res) {
	var start_lat = req.params.latitude
	var start_long = req.params.longitude
	var city = req.params.city
	var num = req.params.num

	getTopDestinations(city, num).then((destinations) => {
		var count = destinations.length

		console.log('destinations')
		console.log(destinations)
		console.log(count)

		var topPath = new Array()

		for (var i = 0; i < count; ++i) {
			var nextStop = findNextStop(start_lat, start_long, destinations)
			console.log(nextStop)
			topPath.push(nextStop)
			console.log(topPath)
			destinations = removeObj(nextStop, destinations)
			start_lat = nextStop['latitude']
			start_long = nextStop['longitude']
		}

		console.log('topPath: ...')
		console.log(topPath)

		res.send( topPath )
	});
})


function findNextStop(start_lat, start_long, destinations) {
	var nextDest, bestScore = null;
	var count = destinations.length

	for (var i = 0; i < count; i++) {
		console.log(destinations[i])
		uber.estimates.getPriceForRoute(start_lat, start_long, destinations[i].latitude, destinations[i].longitude, function (err, resp) {
			if (err) {
				console.error(err)
				console.log("error")
				console.log(destinations[i]['latitude'])
				console.log(destinations[i]['longitude'])
			}
			else {
				var distance = resp['prices'][0]['distance']
				var costEstimate = resp['prices'][0]['high_estimate']
	  			var duration = resp['prices'][0]['duration']
	  			var rating = resp['prices'][0]['rating']
	  			var isClosed = resp['prices'][0]['is_closed']

	  			var score = (3*distance + 2*costEstimate + duration - rating)

	  			if (nextDest === null) {
	  				nextDest = dest
	  				bestScore = score
	  			}
	  			else if (score < bestScore && !isClosed) {
	  				nextDest = dest
	  				bestScore = score
	  			}
			}
		})
	}
	return nextDest;
}



// find top destinations (yelp): returns an array of Objects with keys: latitude, longitude, city
function getTopDestinations(city, num) {
	return new Promise((resolve, reject) => {
		var destinations = new Array()

		var searchRequest = {
			//why is this filter not working?????
			category_filter: 'tours',
			location: city,
			limit: num
		};

		yelp.accessToken(clientId, clientSecret).then(response => {
		  var client = yelp.client(response.jsonBody.access_token);

		  client.search(searchRequest)
		  .then(response => {
		    var Result = response.jsonBody.businesses;
		    //var prettyJson = JSON.stringify(Result, null, 4);
		    console.log(Result.length)
		    var destinations = new Array()
		    console.log(Result)
		    //console.log(prettyJson);
		    for (obj in Result) {
		    	console.log(obj)
		    	console.log("TEST")
		    	var latitude = Result[obj]['coordinates']['latitude']
		    	var longitude = Result[obj]['coordinates']['longitude']
		    	destinations.push({'latitude': latitude, 'longitude': longitude})
		    }

		    resolve(destinations);
		  });
			}).catch(e => {
				console.log(e);
				reject(e);
			});
	});
}


function removeObj(nextStop, destinations) {
	for (var i = 0; i < destinations.count; ++i) {
		if (destinations[i] == nextStop) {
			destinations.splice(i, 1);
		}
	}
	return destinations;
}




app.listen(8000, function () {
  console.log('Example app listening on port 8000!')
})

