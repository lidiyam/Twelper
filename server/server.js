const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const yelpCreds = require('./yelpSecret');
const yelp = require('yelp-fusion');
const uberCreds = require('./uberSecret');
const Uber = require('node-uber');
const Promise = require('promise');

const clientId = yelpCreds.clientId;
const clientSecret = yelpCreds.clientSecret;

app.use(bodyParser())

app.get('/destinations/:city/:num',function(req,res) {
	let searchRequest = {
		//why is this filter not working?????
		category_filter: 'tours',
		location: req.params.city,
		limit: req.params.num
	};

	yelp.accessToken(clientId, clientSecret).then(response => {
	  let client = yelp.client(response.jsonBody.access_token);

	  client.search(searchRequest)
	  .then(response => {
	    let Result = response.jsonBody.businesses;
	    let prettyJson = JSON.stringify(Result, null, 4);
	    res.send(prettyJson);
	  });
		}).catch(e => {
		  res.send(e);
		});

});

let uber = new Uber({
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
	let start_lat = req.params.latitude
	let start_long = req.params.longitude
	let city = req.params.city
	let num = req.params.num

	getTopDestinations(city, num).then(async (destinations) => {
		let count = destinations.length
		let topPath = new Array()

		try {
			for (let i = 0; i < count; ++i) {
				let nextStop = await findNextStop(start_lat, start_long, destinations);
				topPath.push(nextStop)
				destinations = removeObj(nextStop, destinations)
				start_lat = nextStop['latitude']
				start_long = nextStop['longitude']
			}
		} catch (e) {
			console.log("ERROR")
			console.log(e);
		}
		res.send( topPath )
	});
})


function findNextStop(start_lat, start_long, destinations) {
	return new Promise((resolve, reject) => {
		let nextDest, bestScore = null;
		let calculated = 0;
		let costEstimates = new Object();

		let count = destinations.length
		console.log('len: ' + count)

		for (let i = 0; i < count; i++) {
			console.log(destinations[i])
			uber.estimates.getPriceForRoute(start_lat, start_long, destinations[i].latitude, destinations[i].longitude, (err, resp) => {
				if (err) {
					console.error(err)
				}
				else {
					let distance = resp['prices'][0]['distance']
					let lowEstimate = resp['prices'][0]['low_estimate']
					let highEstimate = resp['prices'][0]['high_estimate']
		  			let duration = resp['prices'][0]['duration']

		  			let score = (3*distance + 2*highEstimate + duration)

		  			calculated += 1;
		  			if (!nextDest || (score < bestScore)) {
		  				nextDest = destinations[i]
		  				costEstimates['low_estimate'] = lowEstimate
		  				costEstimates['high_estimate'] = highEstimate
		  				nextDest['cost_estimates'] = costEstimates
		  				nextDest['time_estimate'] = duration 	// in seconds
		  				nextDest['distance'] = distance			// in miles
		  				bestScore = score

		  				console.log(nextDest)
		  			}

		  			if (calculated == count) {
		  				resolve(nextDest);
		  			}
				}
			})
		}
	})
}



// find top destinations (yelp): returns an array of Objects with keys: latitude, longitude
function getTopDestinations(city, num) {
	return new Promise((resolve, reject) => {
		let destinations = new Array()

		let searchRequest = {
			//why is this filter not working?????
			category_filter: 'tours',
			location: city,
			limit: num
		};

		yelp.accessToken(clientId, clientSecret).then(response => {
		  let client = yelp.client(response.jsonBody.access_token);

		  client.search(searchRequest)
		  .then(response => {
		    let Result = response.jsonBody.businesses;
		    console.log(Result.length)
		    let destinations = new Array()
		    console.log(Result)
		    for (obj in Result) {
		    	let latitude = Result[obj]['coordinates']['latitude']
		    	let longitude = Result[obj]['coordinates']['longitude']
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
	for (let i = 0; i < destinations.length; ++i) {
		if (destinations[i] == nextStop) {
			destinations.splice(i, 1);
		}
	}
	return destinations;
}



app.listen(8000, function () {
  console.log('Example app listening on port 8000!')
})

