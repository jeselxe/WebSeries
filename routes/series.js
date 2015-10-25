var models  = require('../models');
var express = require('express');
var Sequelize = require("sequelize");
var sequelize = new Sequelize('bd', '', '', { dialect: 'sqlite', storage: 'bd.sqlite' });
var router  = express.Router();


router.get('/', function(req, res) {
	models.Serie.findAll().then(function(series) {
		res.send(series);
	});
});

router.post('/', function(req, res) {	
	models.Serie.create({
		title: req.body.title,
		description: req.body.description,
		UsuarioId: req.body.user
	}).then(function() {
		res.status(201).send("Serie creada correctamente");
	});
});

router.post('/:id/temporada', function(req, res) {
	var id = req.params.id;
	if (isNaN(id)) {
		res.status(400).send("Error: El id no es un número");
	}
	else {
		models.Serie.findById(id).then(function(serie){
			if (serie) {
				models.Temporada.findAll({
					where : {
						SerieId : serie.id	
					},
					attributes: { include : [[sequelize.fn('COUNT', sequelize.col('season')), 'count']] }
				}).then(function (temporadas) {
					models.Temporada.create({
						SerieId: id,
						season : temporadas[0].dataValues.count + 1
					}).then(function() {
						res.status(201).send("Temporada creada correctamente");
					});
				});
			}
			else {
				res.status(404).end();
			}
		});
	}
});

router.delete('/:id', function(req, res) {
	var id = req.params.id;
	if (isNaN(id)) {
		res.status(400).send("Error: El id no es un número");
	}
	else {
		models.Serie.destroy({
			where: {
				id: id
			}
		}).then(function() {
			res.send("serie Eliminada");
		});
	}
});

router.put('/:id', function(req, res) {
	var id = req.params.id;
	if (isNaN(id)) {
		res.status(400).send("Error: El id no es un número");
	}
	else {
		models.Serie.findById(id).then(function(serie){
			if (serie) {
				var options = {};
				for (var param in req.body) {
					options[param] =  req.body[param];
				}
				
				serie.update(options)
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

router.get('/:id', function(req, res) {
	var id = req.params.id;
	if (isNaN(id)) {
		res.status(400).send("Error: El id no es un número");
	}
	else {
		models.Serie.findById(id).then(function(serie) {
			if (serie) {
				models.Temporada.findAll({
					attributes : ['id', 'season'],
					where : {
						SerieId : id
					}
				}).then(function (temporadas) {
					serie.dataValues.temporadas = temporadas;
					res.send(serie);
				});
			}
			else {
				res.status(404).end();
			}
		});
	}
});

module.exports = router;