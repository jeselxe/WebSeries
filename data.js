var models = require('./models');

var userId;

var data =  function() { 
	return models.sequelize.sync({force: true}).then(function(){
		return models.Usuario.create({nickname:'Pepe', password:'pepe'});
	}).then(function(usuario){
		userId = usuario.id;
		return models.Serie.create({title: 'The Big Bang Theory', description: 'descripción de la serie The Big Bang Theory', UsuarioId: usuario.id});
	}).then(function(serie) {
		return models.Temporada.bulkCreate([
			{id: 1, season: 1, SerieId: serie.id},
			{id: 2, season: 2, SerieId: serie.id},
			{id: 3, season: 3, SerieId: serie.id},
			{id: 4, season: 4, SerieId: serie.id},
			{id: 5, season: 5, SerieId: serie.id},
			{id: 6, season: 6, SerieId: serie.id},
			{id: 7, season: 7, SerieId: serie.id},
			{id: 8, season: 8, SerieId: serie.id},
			{id: 9, season: 9, SerieId: serie.id}
		]);
	}).then(function() {
		return models.Capitulo.bulkCreate([
			{id: 1, title: 'Capitulo 1', TemporadaId: 1},
			{id: 2, title: 'Capitulo 2', TemporadaId: 1},
			{id: 3, title: 'Capitulo 3', TemporadaId: 1},
			{id: 4, title: 'Capitulo 4', TemporadaId: 1},
			{id: 5, title: 'Capitulo 1', TemporadaId: 2},
			{id: 6, title: 'Capitulo 2', TemporadaId: 2},
			{id: 7, title: 'Capitulo 1', TemporadaId: 3},
			{id: 8, title: 'Capitulo 2', TemporadaId: 4},
			{id: 9, title: 'Capitulo 3', TemporadaId: 4},
			{id: 10, title: 'Capitulo 1', TemporadaId: 5},
			{id: 11, title: 'Capitulo 2', TemporadaId: 5},
			{id: 12, title: 'Capitulo 3', TemporadaId: 5},
			{id: 13, title: 'Capitulo 4', TemporadaId: 5},
			{id: 14, title: 'Capitulo 5', TemporadaId: 5},
			{id: 15, title: 'Capitulo 1', TemporadaId: 6},
			{id: 16, title: 'Capitulo 2', TemporadaId: 6},
			{id: 17, title: 'Capitulo 3', TemporadaId: 6},
			{id: 18, title: 'Capitulo 1', TemporadaId: 7},
			{id: 19, title: 'Capitulo 2', TemporadaId: 7},
			{id: 20, title: 'Capitulo 3', TemporadaId: 7},
			{id: 21, title: 'Capitulo 1', TemporadaId: 8},
			{id: 22, title: 'Capitulo 2', TemporadaId: 8},
			{id: 23, title: 'Capitulo 1', TemporadaId: 9},
			{id: 24, title: 'Capitulo 2', TemporadaId: 9},
			{id: 25, title: 'Capitulo 3', TemporadaId: 9}
		]);
	})
	.then(function() {
		return models.Serie.create({title: 'Breaking Bad', description: 'descripción de la serie Breaking Bad', UsuarioId: userId});
	}).then(function(serie) {
		return models.Temporada.bulkCreate([
			{id: 10, season: 1, SerieId: serie.id},
			{id: 11, season: 2, SerieId: serie.id},
			{id: 12, season: 3, SerieId: serie.id},
			{id: 13, season: 4, SerieId: serie.id},
			{id: 14, season: 5, SerieId: serie.id}
		]);
	}).then(function () {
		return models.Capitulo.bulkCreate([
			{id: 26, title: 'Capitulo 1', TemporadaId: 10},
			{id: 27, title: 'Capitulo 2', TemporadaId: 10},
			{id: 28, title: 'Capitulo 3', TemporadaId: 10},
			{id: 29, title: 'Capitulo 4', TemporadaId: 10},
			{id: 30, title: 'Capitulo 5', TemporadaId: 10},
			{id: 31, title: 'Capitulo 1', TemporadaId: 11},
			{id: 32, title: 'Capitulo 2', TemporadaId: 11},
			{id: 33, title: 'Capitulo 3', TemporadaId: 11},
			{id: 34, title: 'Capitulo 4', TemporadaId: 11},
			{id: 35, title: 'Capitulo 5', TemporadaId: 11},
			{id: 36, title: 'Capitulo 1', TemporadaId: 12},
			{id: 37, title: 'Capitulo 2', TemporadaId: 12},
			{id: 38, title: 'Capitulo 3', TemporadaId: 12},
			{id: 39, title: 'Capitulo 4', TemporadaId: 12},
			{id: 40, title: 'Capitulo 5', TemporadaId: 12},
			{id: 41, title: 'Capitulo 1', TemporadaId: 13},
			{id: 42, title: 'Capitulo 2', TemporadaId: 13},
			{id: 43, title: 'Capitulo 3', TemporadaId: 13},
			{id: 44, title: 'Capitulo 4', TemporadaId: 13},
			{id: 45, title: 'Capitulo 5', TemporadaId: 13},
			{id: 46, title: 'Capitulo 1', TemporadaId: 14},
			{id: 47, title: 'Capitulo 2', TemporadaId: 14},
			{id: 48, title: 'Capitulo 3', TemporadaId: 14},
			{id: 49, title: 'Capitulo 4', TemporadaId: 14},
			{id: 50, title: 'Capitulo 5', TemporadaId: 14}
		]);
	})
	.then(function () {
		return models.Comentario.bulkCreate([
			{comment : 'Comentario 1', UsuarioId : 1, CapituloId: 1},
			{comment : 'Comentario 2', UsuarioId : 1, CapituloId: 2},
			{comment : 'Comentario 3', UsuarioId : 1, CapituloId: 3},
			{comment : 'Comentario 4', UsuarioId : 1, CapituloId: 4},
			{comment : 'Comentario 5', UsuarioId : 1, CapituloId: 5},
			{comment : 'Comentario 6', UsuarioId : 1, CapituloId: 6},
			{comment : 'Comentario 7', UsuarioId : 1, CapituloId: 7},
			{comment : 'Comentario 8', UsuarioId : 1, CapituloId: 8},
			{comment : 'Comentario 9', UsuarioId : 1, CapituloId: 9},
			{comment : 'Comentario 10', UsuarioId : 1, CapituloId: 11},
			{comment : 'Comentario 11', UsuarioId : 1, CapituloId: 11},
			{comment : 'Comentario 12', UsuarioId : 1, CapituloId: 12},
			{comment : 'Comentario 13', UsuarioId : 1, CapituloId: 13},
			{comment : 'Comentario 14', UsuarioId : 1, CapituloId: 14},
			{comment : 'Comentario 15', UsuarioId : 1, CapituloId: 15},
			{comment : 'Comentario 16', UsuarioId : 1, CapituloId: 16},
			{comment : 'Comentario 17', UsuarioId : 1, CapituloId: 17},
			{comment : 'Comentario 18', UsuarioId : 1, CapituloId: 18},
			{comment : 'Comentario 19', UsuarioId : 1, CapituloId: 19},
			{comment : 'Comentario 20', UsuarioId : 1, CapituloId: 20},
			{comment : 'Comentario 21', UsuarioId : 1, CapituloId: 21},
			{comment : 'Comentario 22', UsuarioId : 1, CapituloId: 22},
			{comment : 'Comentario 23', UsuarioId : 1, CapituloId: 23},
			{comment : 'Comentario 24', UsuarioId : 1, CapituloId: 24},
			{comment : 'Comentario 25', UsuarioId : 1, CapituloId: 25},
			{comment : 'Comentario 26', UsuarioId : 1, CapituloId: 26},
			{comment : 'Comentario 27', UsuarioId : 1, CapituloId: 27},
			{comment : 'Comentario 28', UsuarioId : 1, CapituloId: 28},
			{comment : 'Comentario 29', UsuarioId : 1, CapituloId: 29},
			{comment : 'Comentario 30', UsuarioId : 1, CapituloId: 30},
			{comment : 'Comentario 31', UsuarioId : 1, CapituloId: 1},
			{comment : 'Comentario 32', UsuarioId : 1, CapituloId: 2},
			{comment : 'Comentario 33', UsuarioId : 1, CapituloId: 3},
			{comment : 'Comentario 34', UsuarioId : 1, CapituloId: 4},
			{comment : 'Comentario 35', UsuarioId : 1, CapituloId: 5},
			{comment : 'Comentario 36', UsuarioId : 1, CapituloId: 6},
			{comment : 'Comentario 37', UsuarioId : 1, CapituloId: 7},
			{comment : 'Comentario 38', UsuarioId : 1, CapituloId: 8},
			{comment : 'Comentario 39', UsuarioId : 1, CapituloId: 9},
			{comment : 'Comentario 40', UsuarioId : 1, CapituloId: 10},
			{comment : 'Comentario 41', UsuarioId : 1, CapituloId: 31},
			{comment : 'Comentario 42', UsuarioId : 1, CapituloId: 32},
			{comment : 'Comentario 43', UsuarioId : 1, CapituloId: 33},
			{comment : 'Comentario 44', UsuarioId : 1, CapituloId: 34},
			{comment : 'Comentario 45', UsuarioId : 1, CapituloId: 35},
			{comment : 'Comentario 46', UsuarioId : 1, CapituloId: 36},
			{comment : 'Comentario 47', UsuarioId : 1, CapituloId: 37},
			{comment : 'Comentario 48', UsuarioId : 1, CapituloId: 38},
			{comment : 'Comentario 49', UsuarioId : 1, CapituloId: 39},
			{comment : 'Comentario 50', UsuarioId : 1, CapituloId: 40},
			{comment : 'Comentario 51', UsuarioId : 1, CapituloId: 41},
			{comment : 'Comentario 52', UsuarioId : 1, CapituloId: 42},
			{comment : 'Comentario 53', UsuarioId : 1, CapituloId: 43},
			{comment : 'Comentario 54', UsuarioId : 1, CapituloId: 44},
			{comment : 'Comentario 55', UsuarioId : 1, CapituloId: 45},
			{comment : 'Comentario 56', UsuarioId : 1, CapituloId: 46},
			{comment : 'Comentario 57', UsuarioId : 1, CapituloId: 47},
			{comment : 'Comentario 58', UsuarioId : 1, CapituloId: 48},
			{comment : 'Comentario 59', UsuarioId : 1, CapituloId: 49},
			{comment : 'Comentario 60', UsuarioId : 1, CapituloId: 50}
		]);
	})
	.then(function () {
		return models.Comentario.bulkCreate([
			{comment : 'Comentario a serie 1', UsuarioId : 1, SerieId: 1},
			{comment : 'Comentario a serie 2', UsuarioId : 1, SerieId: 1},
			{comment : 'Comentario a serie 3', UsuarioId : 1, SerieId: 1},
			{comment : 'Comentario a serie 4', UsuarioId : 1, SerieId: 1},
			{comment : 'Comentario a serie 5', UsuarioId : 1, SerieId: 1},
			{comment : 'Comentario a serie 6', UsuarioId : 1, SerieId: 1},
			{comment : 'Comentario a serie 7', UsuarioId : 1, SerieId: 1},
			{comment : 'Comentario a serie 8', UsuarioId : 1, SerieId: 1},
			{comment : 'Comentario a serie 9', UsuarioId : 1, SerieId: 1},
			{comment : 'Comentario a serie 10', UsuarioId : 1, SerieId: 1},
			{comment : 'Comentario a serie 11', UsuarioId : 1, SerieId: 2},
			{comment : 'Comentario a serie 12', UsuarioId : 1, SerieId: 2},
			{comment : 'Comentario a serie 13', UsuarioId : 1, SerieId: 2},
			{comment : 'Comentario a serie 14', UsuarioId : 1, SerieId: 2},
			{comment : 'Comentario a serie 15', UsuarioId : 1, SerieId: 2},
			{comment : 'Comentario a serie 16', UsuarioId : 1, SerieId: 2},
			{comment : 'Comentario a serie 17', UsuarioId : 1, SerieId: 2},
			{comment : 'Comentario a serie 18', UsuarioId : 1, SerieId: 2},
			{comment : 'Comentario a serie 19', UsuarioId : 1, SerieId: 2},
			{comment : 'Comentario a serie 20', UsuarioId : 1, SerieId: 2}
		]);
	});
};

var drop = function() {
		return models.Usuario.destroy({truncate: true, cascade : true});
}

module.exports = {
	fillData : data,
	dropDB : drop
}