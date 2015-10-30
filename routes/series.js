var models  = require('../models');
var express = require('express');
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
				res.status(404).send("La serie no existe");
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
				res.status(404).send("La serie no existe");
			}
		});
	}
});


router.post('/:id/temporada', function(req, res) {
	var id = req.params.id;
	if (isNaN(id)) {
		res.status(400).send("Error: El id no es un número");
	}
	else {
		models.Serie.findById(id).then(function(serie){
			if (serie) {
				serie.getTemporadas().then(function(temporadas) {
					models.Temporada.create({
						SerieId : id,
						season : temporadas.length + 1
					}).then(function() {
						res.status(201).send("Temporada creada correctamente");
					});
				});
			}
			else {
				res.status(404).send("La serie no existe");
			}
		});
	}
});

router.delete('/:id/temporada/:season', function(req, res) {
	var id = req.params.id;
	var seasonId = req.params.season;
	if (isNaN(id)) {
		res.status(400).send("Error: El id de la serie no es un número");
	}
	else if (isNaN(seasonId)) {
		res.status(400).send("Error: El id de la temporada no es un número");
	}
	else { 
		models.Serie.findById(id).then(function(serie){
			if (serie) {
				serie.getTemporadas().then(function(temporadas) {
					var isSeason = false;
					temporadas.forEach(function (temporada) {
						if(temporada.dataValues.id == seasonId) {
							isSeason = true;
							models.Temporada.destroy({
								where : {
									id :seasonId
								}
							}).then(function() {
								res.send("Temporada eliminada").end();
							});
						}
					});
					if (!isSeason) {
						res.status(404).send("La temporada no existe o no pertenece a esta serie");
					}
				});
			}
			else {
				res.status(404).send("La serie no existe");
			}
		});
	}
});

router.get('/:id/temporada/:season', function(req, res) {
	var id = req.params.id;
	var seasonId = req.params.season;
	if (isNaN(id)) {
		res.status(400).send("Error: El id de la serie no es un número");
	}
	else if (isNaN(seasonId)) {
		res.status(400).send("Error: El id de la temporada no es un número");
	}
	else {
		models.Serie.findById(id).then(function(serie){
			if (serie) {
				serie.getTemporadas().then(function (temporadas) {
					var isSeason = false;
					temporadas.forEach(function (temporada) {
						if(temporada.dataValues.id == seasonId) {
							isSeason = true;
							temporada.getCapitulos().then(function (capitulos) {
								res.send(capitulos);
							});
						}
					});
					if (!isSeason) {
						res.status(404).send("La temporada no existe o no pertenece a esta serie");
					}
				});
			}
			else {
				res.status(404).send("La serie no existe");
			}
		});
	}
});

router.post('/:id/temporada/:season/capitulo', function(req, res) {
	var id = req.params.id;
	var seasonId = req.params.season;
	if (isNaN(id)) {
		res.status(400).send("Error: El id de la serie no es un número");
	}
	else if (isNaN(seasonId)) {
		res.status(400).send("Error: El id de la temporada no es un número");
	}
	else {
		models.Serie.findById(id).then(function(serie){
			if (serie) {
				serie.getTemporadas().then(function (temporadas) {
					var isSeason = false;
					temporadas.forEach(function (temporada) {
						if(temporada.dataValues.id == seasonId) {
							isSeason = true;
							models.Capitulo.create({
								title : req.body.title,
								TemporadaId : seasonId
							}).then(function () {
								res.status(201).send("Capítulo creado correctamente");
							});
						}
					});
					if (!isSeason) {
						res.status(404).send("La temporada no existe o no pertenece a esta serie");
					}
				});
			}
			else {
				res.status(404).send("La serie no existe");
			}
		});
	}
});

router.delete('/:id/temporada/:season/capitulo/:episode', function(req, res) {
	var id = req.params.id;
	var seasonId = req.params.season;
	var episodeId = req.params.episode;
	if (isNaN(id)) {
		res.status(400).send("Error: El id de la serie no es un número");
	}
	else if (isNaN(seasonId)) {
		res.status(400).send("Error: El id de la temporada no es un número");
	}
	else if (isNaN(episodeId)) {
		res.status(400).send("Error: El id del capitulo no es un número");
	}
	else {
		models.Serie.findById(id).then(function(serie){
			if (serie) {
				serie.getTemporadas().then(function (temporadas) {
					var isSeason = false;
					temporadas.forEach(function (temporada) {
						if(temporada.dataValues.id == seasonId) {
							isSeason = true;
							temporada.getCapitulos().then(function (capitulos) {
								var isEpisode = false;
								capitulos.forEach(function (capitulo) {
									if (capitulo.dataValues.id == episodeId) {
										isEpisode = true;
										models.Capitulo.destroy({
											where : {
												id : episodeId
											}
										}).then(function () {
											res.send("Capitulo eliminado").end();
										})
									}
								});
								if(!isEpisode)
									res.status(404).send("El capítulo no existe o no pertenece a esta temporada");
							});
						}
					});
					if (!isSeason) {
						res.status(404).send("La temporada no existe o no pertenece a esta serie");
					}
				});
			}
			else {
				res.status(404).send("La serie no existe");
			}
		});
	}
});

router.put('/:id/temporada/:season/capitulo/:episode', function(req, res) {
	var id = req.params.id;
	var seasonId = req.params.season;
	var episodeId = req.params.episode;
	if (isNaN(id)) {
		res.status(400).send("Error: El id de la serie no es un número");
	}
	else if (isNaN(seasonId)) {
		res.status(400).send("Error: El id de la temporada no es un número");
	}
	else if (isNaN(episodeId)) {
		res.status(400).send("Error: El id del capitulo no es un número");
	}
	else {
		models.Serie.findById(id).then(function(serie){
			if (serie) {
				serie.getTemporadas().then(function (temporadas) {
					var isSeason = false;
					temporadas.forEach(function (temporada) {
						if(temporada.dataValues.id == seasonId) {
							isSeason = true;
							temporada.getCapitulos().then(function (capitulos) {
								var isEpisode = false;
								capitulos.forEach(function (capitulo) {
									if (capitulo.dataValues.id == episodeId) {
										isEpisode = true;
										capitulo.update({
											title : req.body.title
										}).then(function () {
											res.status(204).end();
										})
									}
								});
								if(!isEpisode)
									res.status(404).send("El capítulo no existe o no pertenece a esta temporada");
							});
						}
					});
					if (!isSeason) {
						res.status(404).send("La temporada no existe o no pertenece a esta serie");
					}
				});
			}
			else {
				res.status(404).send("La serie no existe");
			}
		});
	}
});

module.exports = router;