var app = require('../app');
var supertest = require('supertest');
var assert = require('assert');
var data = require('../data');

describe('Pruebas de Usuarios', function () {
	
	beforeEach('Reset DB', function (done) {
		data.fillData().then(function () {
			console.log('Database updated');
			done();
		});
	});
	
	it('GET /:id devuelve el usuario', function (done) {
		supertest(app)
		.get('/api/usuario/1')
		.expect(200)
		.expect(function(res) {
			assert(res.text.indexOf('Pepe') != -1);
		})
		.end(done);
	});
	
	it('GET /:id no existe usuario', function(done) {
		supertest(app)
		.get('/api/usuario/0')
		.expect(404, done);
	});
	
	it('GET /:id id no numérico', function(done) {
		supertest(app)
		.get('/api/usuario/uno')
		.expect(400, done);
	});
	
	it('GET /:id/serie devuelve las series del usuario', function (done) {
		supertest(app)
		.get('/api/usuario/1/series')
		.expect(200)
		.expect(function(res) {
			assert(res.text.indexOf('The Big Bang Theory') != -1);
			assert(res.text.indexOf('Breaking Bad') != -1);
		})
		.end(done);
	});
	
	it('GET /:id/serie no existe usuario', function(done) {
		supertest(app)
		.get('/api/usuario/0/series')
		.expect(404, done);
	});
	
	it('GET /:id id no numérico', function(done) {
		supertest(app)
		.get('/api/usuario/uno/series')
		.expect(400, done);
	});
	
	it('POST / crea nuevo usuario', function(done) {
		supertest(app)
		.post('/api/usuario')
		.field('nickname', 'Jose')
		.field('password', 'Password')
		.expect(201, done);
	});
	
	it('PUT /:id actualiza el usuario', function(done) {
		supertest(app)
		.put('/api/usuario/1')
		.set('Authorization', 'Basic UGVwZTpwZXBl')
		.field('nickname', 'Juan')
		.expect(204, done);
	});
	
	it('PUT /:id no existe usuario', function(done) {
		supertest(app)
		.put('/api/usuario/0')
		.set('Authorization', 'Basic UGVwZTpwZXBl')
		.field('nickname', 'Juan')
		.expect(404, done);		
	});
	
	it('PUT /:id id no numérico', function(done) {
		supertest(app)
		.put('/api/usuario/uno')
		.set('Authorization', 'Basic UGVwZTpwZXBl')
		.field('nickname', 'Juan')
		.expect(400, done);		
	});
	
	it('DELETE /:id no existe usuario', function(done) {
		supertest(app)
		.delete('/api/usuario/0')
		.set('Authorization', 'Basic UGVwZTpwZXBl')
		.expect(404, done);
	});
	
	it('DELETE /:id id no numérico', function(done) {
		supertest(app)
		.delete('/api/usuario/uno')
		.set('Authorization', 'Basic UGVwZTpwZXBl')
		.expect(400, done);
	});
	
	it('DELETE /:id borra el usuario', function(done) {
		supertest(app)
		.delete('/api/usuario/1')
		.set('Authorization', 'Basic UGVwZTpwZXBl')
		.expect(204, done);
	});
	
})
