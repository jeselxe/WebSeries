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
	
});