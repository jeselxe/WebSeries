var app = require('../app');
var supertest = require('supertest');
var assert = require('assert');

describe('Pruebas de Comentarios', function () {
	it('GET /:id', function(done) {
		supertest(app)
		.get('/api/series/1')
		.expect(200)
		.expect(function (res) {
			assert.equal(10, res.body.comentarios.length);
		})
		.end(done);
	});
	
	it('GET /:id/temporada/:season/capitulo/:episode', function(done) {
		supertest(app)
		.get('/api/series/1/temporada/1/capitulo/1')
		.expect(200)
		.expect(function (res) {
			assert.equal(2, res.body.length);
		})
		.end(done);
	});
	
	it('POST /:id/temporada/:season/capitulo/:episode añade nuevo comentario al capítulo', function(done) {
		supertest(app)
		.post('/api/series/1/temporada/1/capitulo/1/comentario')
		.send({comment : 'Nuevo comentario', user: 1})
		.expect(201)
		.expect("Comentario creado correctamente", done);
	});
	
	it('POST /:id/capitulo/:episode añade nuevo comentario a la serie', function(done) {
		supertest(app)
		.post('/api/series/1/comentario')
		.send({comment : 'Nuevo comentario', user: 1})
		.expect(201)
		.expect("Comentario creado correctamente", done);
	});
	
});