var app = require('../app');
var supertest = require('supertest');
var assert = require('assert');
var data = require('../data');

describe('Pruebas de Capítulos', function () {
	
	beforeEach('Reset DB', function (done) {
		data.fillData().then(function () {
			console.log('Database updated');
			done();
		});
	});
	
	it('GET /:id/temporada/:season devuelve los capítulos de la temporada', function(done) {
		supertest(app)
		.get('/api/series/1/temporada/1')
		.expect(200)
		.expect(function(res) {
			assert(res.text.indexOf('Capitulo 1') != -1);
			assert(res.text.indexOf('Capitulo 2') != -1);
			assert(res.text.indexOf('Capitulo 3') != -1);
			assert(res.text.indexOf('Capitulo 4') != -1);
		})
		.end(done);
	});
	
	it('GET /:id/temporada/:season/capitulo/:episode id episodio no es numérico', function(done) {
		supertest(app)
		.get('/api/series/1/temporada/1/capitulo/uno')
		.expect(400)
		.expect("Error: El id del capítulo no es un número", done);
	});
	
	it('POST /:id/temporada/:season/capitulo id no numérico', function(done) {
		supertest(app)
		.post('/api/series/uno/temporada/1/capitulo')
		.set('Authorization', 'Basic UGVwZTpwZXBl')
		.field('title', 'Titulo de capítulo')
		.expect(400)
		.expect("Error: El id de la serie no es un número", done);
	});
	
	it('POST /:id/temporada/:season/capitulo season no numérico', function(done) {
		supertest(app)
		.post('/api/series/1/temporada/uno/capitulo')
		.set('Authorization', 'Basic UGVwZTpwZXBl')		
		.field('title', 'Titulo de capítulo')
		.expect(400)
		.expect("Error: El id de la temporada no es un número", done);
	});
	
	it('POST /:id/temporada/:season/capitulo serie no existe', function(done) {
		supertest(app)
		.post('/api/series/0/temporada/1/capitulo')
		.set('Authorization', 'Basic UGVwZTpwZXBl')
		.field('title', 'Titulo de capítulo')
		.expect(404)
		.expect("La serie no existe", done);
	});
	
	it('POST /:id/temporada/:season/capitulo temporada de otra serie', function(done) {
		supertest(app)
		.post('/api/series/1/temporada/13/capitulo')
		.set('Authorization', 'Basic UGVwZTpwZXBl')
		.field('title', 'Titulo de capítulo')
		.expect(404)
		.expect("La temporada no existe o no pertenece a esta serie", done);
	});
	
	it('POST /:id/temporada/:season/capitulo añade nuevo capítulo', function(done) {
		supertest(app)
		.post('/api/series/1/temporada')
		.set('Authorization', 'Basic UGVwZTpwZXBl')
		.field('title', 'Titulo de capítulo')
		.expect(201)
		.expect("Temporada creada correctamente", done);
	});
	
	it('DELETE /:id/temporada/:season/capitulo/:episode id no numérico', function(done) {
		supertest(app)
		.delete('/api/series/uno/temporada/1/capitulo/1')
		.set('Authorization', 'Basic UGVwZTpwZXBl')
		.expect(400)
		.expect("Error: El id de la serie no es un número", done);
	});
	
	it('DELETE /:id/temporada/:season/capitulo/:episode season no numérico', function(done) {
		supertest(app)
		.delete('/api/series/1/temporada/uno/capitulo/1')
		.set('Authorization', 'Basic UGVwZTpwZXBl')
		.expect(400)
		.expect("Error: El id de la temporada no es un número", done);
	});
	
	it('DELETE /:id/temporada/:season/capitulo/:episode episode no numérico', function(done) {
		supertest(app)
		.delete('/api/series/1/temporada/1/capitulo/uno')
		.set('Authorization', 'Basic UGVwZTpwZXBl')
		.expect(400)
		.expect("Error: El id del capítulo no es un número", done);
	});
	
	it('DELETE /:id/temporada/:season/capitulo/:episode la temporada no pertenece a la serie', function(done) {
		supertest(app)
		.delete('/api/series/1/temporada/13/capitulo/1')
		.set('Authorization', 'Basic UGVwZTpwZXBl')
		.expect(404)
		.expect("La temporada no existe o no pertenece a esta serie", done);
	});
	
	it('DELETE /:id/temporada/:season/capitulo/:episode el capitulo no pertenece a la temporada', function(done) {
		supertest(app)
		.delete('/api/series/1/temporada/1/capitulo/15')
		.set('Authorization', 'Basic UGVwZTpwZXBl')
		.expect(404)
		.expect("El capítulo no existe o no pertenece a esta temporada", done);
	});
	
	it('DELETE /:id/temporada/:season/capitulo/:episode la serie no existe', function(done) {
		supertest(app)
		.delete('/api/series/0/temporada/1/capitulo/1')
		.set('Authorization', 'Basic UGVwZTpwZXBl')
		.expect(404)
		.expect("La serie no existe", done);
	});
	
	it('DELETE /:id/temporada/:season/capitulo/:episode borra capitulo', function(done) {
		supertest(app)
		.delete('/api/series/1/temporada/1/capitulo/1')
		.set('Authorization', 'Basic UGVwZTpwZXBl')
		.expect(200, done);
	});
	
});