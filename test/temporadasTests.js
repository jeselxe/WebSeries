var app = require('../app');
var supertest = require('supertest');
var assert = require('assert');
var data = require('../data');

describe('Pruebas de Temporadas', function () {
	
	beforeEach('Reset DB', function (done) {
		data.fillData().then(function () {
			console.log('Database updated');
			done();
		});
	});
	
	it('GET /:id/temporada/:season id no numérico', function(done) {
		supertest(app)
		.get('/api/series/uno/temporada/1')
		.expect(400)
		.expect("Error: El id de la serie no es un número", done);
	});
	
	it('GET /:id/temporada/:season season no numérico', function(done) {
		supertest(app)
		.get('/api/series/1/temporada/uno')
		.expect(400)
		.expect("Error: El id de la temporada no es un número", done)
	});
	
	it('GET /:id/temporada/:season temporada no pertenece a la serie', function(done) {
		supertest(app)
		.get('/api/series/1/temporada/10')
		.expect(404)
		.expect("La temporada no existe o no pertenece a esta serie", done);
	});
	
	it('GET /:id/temporada/:season devuelve la temporada', function(done) {
		supertest(app)
		.get('/api/series/1/temporada/1')
		.expect(200)
		.end(done);
	});
	
	it('POST /:id/temporada id no numérico', function(done) {
		supertest(app)
		.post('/api/series/uno/temporada')
		.set('Authorization', 'Basic UGVwZTpwZXBl')
		.expect(400)
		.expect("Error: El id no es un número", done);
	});
	
	it('POST /:id/temporada serie no existe', function(done) {
		supertest(app)
		.post('/api/series/0/temporada')
		.set('Authorization', 'Basic UGVwZTpwZXBl')
		.expect(404)
		.expect("La serie no existe", done);
	});
	
	it('POST /:id/temporada añade nueva temporada', function(done) {
		supertest(app)
		.post('/api/series/1/temporada')
		.set('Authorization', 'Basic UGVwZTpwZXBl')
		.expect(201)
		.expect("Temporada creada correctamente", done);
	});
	
	it('DELETE /:id/temporada/:season id no numérico', function(done) {
		supertest(app)
		.delete('/api/series/uno/temporada/1')
		.set('Authorization', 'Basic UGVwZTpwZXBl')
		.expect(400)
		.expect("Error: El id de la serie no es un número", done);
	});
	
	it('DELETE /:id/temporada/:season season no numérico', function(done) {
		supertest(app)
		.delete('/api/series/1/temporada/uno')
		.set('Authorization', 'Basic UGVwZTpwZXBl')
		.expect(400)
		.expect("Error: El id de la temporada no es un número", done);
	});
	
	it('DELETE /:id/temporada/:season la temporada no pertenece a la serie', function(done) {
		supertest(app)
		.delete('/api/series/1/temporada/13')
		.set('Authorization', 'Basic UGVwZTpwZXBl')
		.expect(404)
		.expect("La temporada no existe o no pertenece a esta serie", done);
	});
	
	it('DELETE /:id/temporada/:season la serie no existe', function(done) {
		supertest(app)
		.delete('/api/series/0/temporada/1')
		.set('Authorization', 'Basic UGVwZTpwZXBl')
		.expect(404)
		.expect("La serie no existe", done);
	});
	
	it('DELETE /:id/temporada/:season borra temporada', function(done) {
		supertest(app)
		.delete('/api/series/1/temporada/1')
		.set('Authorization', 'Basic UGVwZTpwZXBl')
		.expect(200, done);
	});
	
});