var models  = require('../models');
var express = require('express');
var router  = express.Router();

router.get('/:id/series', function(req, res) {
	var id = req.params.id;
	if (isNaN(id)) {
		res.status(400).send("Error: El id no es un número");
	}
	else {
		models.Usuario.findById(id).then(function(user) {
			if(user)
				return user.getSeries();
			else 
				res.status(404).end();
		}).then(function(series) {
			res.send(series);
		});
	}
});

router.get('/:id', function(req, res) {
	var id = req.params.id;
	if (isNaN(id)) {
		res.status(400).send("Error: El id no es un número");
	}
	else {	
		models.Usuario.findById(id).then(function(user) {
			if (user) {
				res.send(user);
			} 
			else {
				res.status(404).end();	
			}
		});
	}
});

router.post('/', function(req, res) {	
	models.Usuario.create({
		nickname: req.body.nickname,
		password: req.body.password
	}).then(function() {
		res.status(201).end();
	});
});

router.delete('/:id', function(req, res) {
	var id = req.params.id;
	if (isNaN(id)) {
		res.status(400).send("Error: El id no es un número");
	}
	else {
		models.Usuario.findById(id).then(function(user){
			if (user) {
				models.Usuario.destroy({
					where: {
						id: id
					}
				}).then(function() {
					res.send("Usuario Eliminado");
				});
			}
			else {
				res.status(404).end();
			}
		});
	}
});

router.put('/:id', function(req, res) {
	var id = req.params.id;
	if (isNaN(id)) {
		res.status(400).send("Error: El id no es un número");
	}
	else {
		models.Usuario.findById(id).then(function(user){
			if (user) {
				var options = {};
				for (var param in req.body) {
					options[param] =  req.body[param];
				}
				
				user.update(options)
				.then(function () {
					res.status(204).end();
				});
			}
			else {
				res.status(404).end();
			}
		});
	}
});

module.exports = router;