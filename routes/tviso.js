var request = require('request-promise');
var config = require('../config');
var express = require('express');
var router  = express.Router();

function getAuthToken() {
	
	var opts = {
		uri : config.tviso.url + "/auth_token",
		qs : {
			id_api : config.tviso.id_api,
			secret : config.tviso.secret
		}
	}
	return request(opts);
}

router.get('/noticias/promocionadas', function(req, res) {
	getAuthToken().then(function(body) {
		var response = JSON.parse(body);
		var opts = {
			uri : config.tviso.url + "/news/promoted",
			qs  : {
				auth_token : response.auth_token,
				page : req.query.page || 1
			}
		}
		
		request(opts).then(function(data) {
			res.header('Content-Type', 'application/json');
			res.send(data);
		});
	});
});

router.get('/noticias/mas_vistas', function(req, res) {
	getAuthToken().then(function(body) {
		var response = JSON.parse(body);
		var opts = {
			uri : config.tviso.url + "/news/most_seen",
			qs  : {
				auth_token : response.auth_token
			}
		}
		
		request(opts).then(function(data) {
			res.header('Content-Type', 'application/json');
			res.send(data);
		});
	});
});

router.get('/noticias/top', function(req, res) {
	getAuthToken().then(function(body) {
		var response = JSON.parse(body);
		var opts = {
			uri : config.tviso.url + "/news/top",
			qs  : {
				auth_token : response.auth_token,
				page : req.query.page || 1
			}
		}
		
		request(opts).then(function(data) {
			res.header('Content-Type', 'application/json');
			res.send(data);
		});
	});
});


router.get('/noticias/mas_votadas', function(req, res) {
	getAuthToken().then(function(body) {
		var response = JSON.parse(body);
		var opts = {
			uri : config.tviso.url + "/news/most_voted",
			qs  : {
				auth_token : response.auth_token
			}
		}
		
		request(opts).then(function(data) {
			res.header('Content-Type', 'application/json');
			res.send(data);
		});
	});
});

router.get('/visualizaciones', function (req, res) {
	getAuthToken().then(function(body) {
		var token = JSON.parse(body).auth_token;
		var opts = {
			uri : config.tviso.url + "/media/search",
			qs : {
				auth_token : token,
				q : req.query.title
			}
		}
		
		request(opts).then(function(data) {
			var search = JSON.parse(data);
			
			var serieOpts = {
				uri : config.tviso.url + "/media/trends",
				qs : {
					auth_token : token,
					idm : search['0'].idm,
					mediaType : 1
				}
			}
			
			request(serieOpts).then(function (media) {
			
			res.header('Content-Type', 'application/json');
			res.send(media);
			});
		});
	});
});

router.get('/noticias/ultimas', function (req, res) {
	getAuthToken().then(function(body) {
		var token = JSON.parse(body).auth_token;
		var opts = {
			uri : config.tviso.url + "/news/last/series",
			qs : {
				auth_token : token,
				page : req.query.page || 1
			}
		}
		
		request(opts).then(function(data) {
			res.header('Content-Type', 'application/json');
			res.send(data);
		});
	});
});
/**
 * A falta de que funcione el user_token
 *
router.get('/noticias/interesantes', function (req, res) {
	getAuthToken().then(function(body) {
		var token = JSON.parse(body).auth_token;
		
		if(req.query.user_token) {
			
			var opts = {
				uri : config.tviso.url + "/news/interesting",
				qs : {
					auth_token : token,
					user_token : req.query.user_token,
					id : req.params.id
				}
			}
			
			request(opts).then(function(data) {
				res.send(data);
			});
			
		}
		else {
			var redirectUrl = "http://" + req.headers.host + req.originalUrl;
			var oauth = config.tviso.url + "/user/user_login?auth_token=" + token + "&redirect_url=" + redirectUrl;
			
			res.redirect(oauth);
		}
	});
});
*/
router.get('/noticias/:id', function (req, res) {
	getAuthToken().then(function(body) {
		var token = JSON.parse(body).auth_token;
		var opts = {
			uri : config.tviso.url + "/news/item",
			qs : {
				auth_token : token,
				id : req.params.id
			}
		}
		
		request(opts).then(function(data) {
			res.header('Content-Type', 'application/json');
			res.send(data);
		});
	});
});

module.exports = router;

