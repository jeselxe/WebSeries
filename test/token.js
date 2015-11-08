var app = require('../app');
var supertest = require('supertest');
var assert = require('assert');
var data = require('../data');

describe('Pruebas de Token', function () {
	
	before('Reset DB', function (done) {
		data.fillData().then(function () {
			console.log('Database updated');
			done();
		});
	});
	
	var token;
	
	it('POST /login devuelve el token', function (done) {
		supertest(app)
		.post('/api/usuario/login')
		.send({user : "Pepe", password : "pepe"})
		.expect(200)
		.expect(function(res) {
			assert(res.headers.authorization.indexOf('Bearer') != -1);
			assert(res.body.basic);
			assert(res.body.token);
			
			token = res.body.token;
		})
		.end(done);
	});
	
	it('POST /serie ', function (done) {
		supertest(app)
		.post('/api/series?access_token=' + token)
		.send({title : 'Futurama', description : 'descripción de la serie Futurama'})
		.expect(201)
		.expect("Serie creada correctamente", done);
	});
	
	it('POST /serie con token invalido', function (done) {
		supertest(app)
		.post('/api/series?access_token=tokeninvalido.queno.existe')
		.send({title : 'Futurama', description : 'descripción de la serie Futurama'})
		.expect(401)
		.expect("Token inválido", done);
	});
	
});