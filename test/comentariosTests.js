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
	
	it('POST /:id/temporada/:season/capitulo/:episode/comentario añade nuevo comentario al capítulo', function(done) {
		supertest(app)
		.post('/api/series/1/temporada/1/capitulo/1/comentario')
		.send({comment : 'Nuevo comentario', user: 1})
		.expect(201)
		.expect("Comentario creado correctamente", done);
	});
	
	it('POST /:id/comentario añade nuevo comentario a la serie', function(done) {
		supertest(app)
		.post('/api/series/1/comentario')
		.send({comment : 'Nuevo comentario', user: 1})
		.expect(201)
		.expect("Comentario creado correctamente", done);
	});
	
	it('PUT /:id/temporada/:season/capitulo/:episode/comentario/:comment edita comentario de capítulo', function(done) {
		supertest(app)
		.put('/api/series/1/temporada/1/capitulo/1/comentario/1')
		.send({comment : 'Nuevo comentario', user: 1})
		.expect(204, done);
	});
	
	it('PUT /:id/comentario/:comment edita comentario de la serie', function(done) {
		supertest(app)
		.put('/api/series/1/comentario/61')
		.send({comment : 'Nuevo comentario', user: 1})
		.expect(204, done);
	});
	
	it('PUT /:id/temporada/:season/capitulo/:episode/comentario/:comment comment no numérico', function(done) {
		supertest(app)
		.put('/api/series/1/temporada/1/capitulo/1/comentario/uno')
		.send({comment : 'Nuevo comentario', user: 1})
		.expect(400)
		.expect("Error: El id del comentario no es un número", done);
	});
	
	it('PUT /:id/comentario/:comment comment no numérico', function(done) {
		supertest(app)
		.put('/api/series/1/comentario/uno')
		.send({comment : 'Nuevo comentario', user: 1})
		.expect(400)
		.expect("Error: El id del comentario no es un número", done);
	});
	
	it('DELETE /:id/temporada/:season/capitulo/:episode/comentario/:comment borra comentario de capítulo', function(done) {
		supertest(app)
		.delete('/api/series/1/temporada/1/capitulo/1/comentario/1')
		.expect(200)
		.expect("Comentario eliminado", done);
	});
	
	it('DELETE /:id/comentario/:comment borra comentario de la serie', function(done) {
		supertest(app)
		.delete('/api/series/1/comentario/61')
		.expect(200)
		.expect("Comentario eliminado", done);
	});
	
	it('DELETE /:id/temporada/:season/capitulo/:episode/comentario/:comment comment no numérico', function(done) {
		supertest(app)
		.delete('/api/series/1/temporada/1/capitulo/1/comentario/uno')
		.expect(400)
		.expect("Error: El id del comentario no es un número", done);
	});
	
	it('DELETE /:id/comentario/:comment comment no numérico', function(done) {
		supertest(app)
		.delete('/api/series/1/comentario/uno')
		.expect(400)
		.expect("Error: El id del comentario no es un número", done);
	});
	
});