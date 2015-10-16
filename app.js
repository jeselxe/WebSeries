var express = require('express');
var Sequelize = require("sequelize");

var app = express();

var PORT = 8000;

app.get('/api/series', function(req, res) {
	Serie.findAll().then(function(series) {
		res.send(series);
	});
});

app.get('/api/usuario/:id/series', function(req, res) {

		Usuario.findById(req.params.id).then(function(user) {
			return user.getSeries();
		}).then(function(series) {
			res.send(series);
		});
	
});

app.get('/api/usuario/:id', function(req, res) {

		Usuario.findById(req.params.id).then(function(user) {
			if (user) {
				res.send(user);
			} 
			else {
				res.status(404).end();	
			}
		});
		
});

var sequelize = new Sequelize('bd', '', '', { 
	dialect: 'sqlite', 
	storage: 'bd.sqlite' 
});

var Serie = sequelize.define('Serie', {
	title: Sequelize.STRING,
	description: Sequelize.TEXT
});

var Usuario = sequelize.define('Usuario', {
	nickname: Sequelize.STRING,
	password: Sequelize.STRING
}, {
	name: {singular: 'Usuario', plural: 'Usuarios'}
});

Serie.belongsTo(Usuario);
Usuario.hasMany(Serie);

sequelize.sync({force: true}).then(function(){
	return Usuario.create({nickname:'Pepe', password:'pepe'});
}).then(function(usuario){
	return Serie.bulkCreate([
		{title: 'The Big Bang Theory', description: 'descripción de la serie The Big Bang Theory', UsuarioId: usuario.id},
		{title: 'Breaking Bad', description: 'descripción de la serie Breaking Bad', UsuarioId: usuario.id}
	]);
}).then(function(){
	app.listen(PORT, function () {
		console.log("Server running on port " + PORT);
	});
});