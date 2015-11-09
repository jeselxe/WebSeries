var request = require('request-promise');
var config = require('../config');
var express = require('express');
var router  = express.Router();

var url = "https://api.tviso.com";

function getAuthToken() {
	
	var opts = {
		uri : url + "/auth_token",
		qs : {
			id_api : config.tviso.id_api,
			secret : config.tviso.secret
		}
	}
	return request(opts);
}

router.get('/promoted', function(req, res) {
	getAuthToken().then(function(body) {
		var response = JSON.parse(body);
		var opts = {
			uri : url + "/news/promoted",
			qs  : {
				auth_token : response.auth_token
			}
		}
		
		request(opts).then(function(data) {
			res.send(data);
		});
	});
});

router.get('/most_seen', function(req, res) {
	getAuthToken().then(function(body) {
		var response = JSON.parse(body);
		var opts = {
			uri : url + "/news/most_seen",
			qs  : {
				auth_token : response.auth_token
			}
		}
		
		request(opts).then(function(data) {
			res.send(data);
		});
	
	});
});

module.exports = router;

