var app = require('../app');
var supertest = require('supertest');
var assert = require('assert');
var data = require('../data');

describe('Pruebas de Series', function () {
	
	beforeEach('Reset DB', function (done) {
		data.fillData().then(function () {
			console.log('Database updated');
			done();
		});
	});
	
	it('GET / devuelve todas las series', function (done) {
		supertest(app)
		.get('/api/series')
		.expect(200)
		.expect(function (req) {
			assert(req.text.indexOf("The Big Bang Theory") != -1);
			assert(req.text.indexOf("Breaking Bad") != -1);
		})
		.end(done);
	});
			
	it('GET /:id id no numérico', function (done) {
		supertest(app)
		.get('/api/series/uno')
		.expect(400)
		.expect("Error: El id no es un número", done);
	});

	it('GET /:id la serie no existe', function (done) {
		supertest(app)
		.get('/api/series/0')
		.expect(404)
		.expect("La serie no existe", done);
	});
	
	it('GET /:id devuelve la serie', function (done) {
		supertest(app)
		.get('/api/series/1')
		.expect(200)
		.expect(function (req) {
			assert.equal("The Big Bang Theory", req.body.title);
			assert.equal("descripción de la serie The Big Bang Theory", req.body.description);
			assert.equal(9, req.body.temporadas.length);
		})
		.end(done);
	});
	
	it('POST / ', function (done) {
		supertest(app)
		.post('/api/series')
		.set('Authorization', 'Basic eyJpZCI6MSwibmlja25hbWUiOiJQZXBlIiwicGFzc3dvcmQiOiJwZXBlIiwidG9rZW4iOiJleUowZVhBaU9pSktWMVFpTENKaGJHY2lPaUpJVXpJMU5pSjkuZXlKc2IyZHBiaUk2SWxCbGNHVWlMQ0psZUhBaU9qRTBORGMxT0RBMk5qRXdPRGw5LmYzSG5BN1BjaGhoQk45bVZWNHlQTDl3dmswbTYyV1QyS2daanc1UE92cXMifQ==')
		.send({title : 'Padre de Familia', description : 'descripción de la serie Padre de Familia'})
		.expect(201)
		.expect("Serie creada correctamente", done);
	});
	
	it('PUT /:id actualiza la serie', function(done) {
		supertest(app)
		.put('/api/series/1')
		.set('Authorization', 'Basic eyJpZCI6MSwibmlja25hbWUiOiJQZXBlIiwicGFzc3dvcmQiOiJwZXBlIiwidG9rZW4iOiJleUowZVhBaU9pSktWMVFpTENKaGJHY2lPaUpJVXpJMU5pSjkuZXlKc2IyZHBiaUk2SWxCbGNHVWlMQ0psZUhBaU9qRTBORGMxT0RBMk5qRXdPRGw5LmYzSG5BN1BjaGhoQk45bVZWNHlQTDl3dmswbTYyV1QyS2daanc1UE92cXMifQ==')
		.send({ description : "Descripción de la serie The Big Bang Theory"})
		.expect(204, done);
	});
	
	it('PUT /:id no existe la serie', function(done) {
		supertest(app)
		.put('/api/series/0')
		.set('Authorization', 'Basic eyJpZCI6MSwibmlja25hbWUiOiJQZXBlIiwicGFzc3dvcmQiOiJwZXBlIiwidG9rZW4iOiJleUowZVhBaU9pSktWMVFpTENKaGJHY2lPaUpJVXpJMU5pSjkuZXlKc2IyZHBiaUk2SWxCbGNHVWlMQ0psZUhBaU9qRTBORGMxT0RBMk5qRXdPRGw5LmYzSG5BN1BjaGhoQk45bVZWNHlQTDl3dmswbTYyV1QyS2daanc1UE92cXMifQ==')
		.send({ description : "Descripción de la serie The Big Bang Theory"})
		.expect(404)
		.expect("La serie no existe", done);		
	});
	
	it('PUT /:id id no numérico', function(done) {
		supertest(app)
		.put('/api/series/uno')
		.set('Authorization', 'Basic eyJpZCI6MSwibmlja25hbWUiOiJQZXBlIiwicGFzc3dvcmQiOiJwZXBlIiwidG9rZW4iOiJleUowZVhBaU9pSktWMVFpTENKaGJHY2lPaUpJVXpJMU5pSjkuZXlKc2IyZHBiaUk2SWxCbGNHVWlMQ0psZUhBaU9qRTBORGMxT0RBMk5qRXdPRGw5LmYzSG5BN1BjaGhoQk45bVZWNHlQTDl3dmswbTYyV1QyS2daanc1UE92cXMifQ==')
		.send({ description : "Descripción de la serie The Big Bang Theory"})
		.expect(400)
		.expect("Error: El id no es un número", done);		
	});
	
	it('DELETE /:id elimina la serie', function(done) {
		supertest(app)
		.delete('/api/series/1')
		.set('Authorization', 'Basic eyJpZCI6MSwibmlja25hbWUiOiJQZXBlIiwicGFzc3dvcmQiOiJwZXBlIiwidG9rZW4iOiJleUowZVhBaU9pSktWMVFpTENKaGJHY2lPaUpJVXpJMU5pSjkuZXlKc2IyZHBiaUk2SWxCbGNHVWlMQ0psZUhBaU9qRTBORGMxT0RBMk5qRXdPRGw5LmYzSG5BN1BjaGhoQk45bVZWNHlQTDl3dmswbTYyV1QyS2daanc1UE92cXMifQ==')
		.expect(200)
		.expect("serie Eliminada", done);
	});
	
	it('DELETE /:id no existe la serie', function(done) {
		supertest(app)
		.delete('/api/series/0')
		.set('Authorization', 'Basic eyJpZCI6MSwibmlja25hbWUiOiJQZXBlIiwicGFzc3dvcmQiOiJwZXBlIiwidG9rZW4iOiJleUowZVhBaU9pSktWMVFpTENKaGJHY2lPaUpJVXpJMU5pSjkuZXlKc2IyZHBiaUk2SWxCbGNHVWlMQ0psZUhBaU9qRTBORGMxT0RBMk5qRXdPRGw5LmYzSG5BN1BjaGhoQk45bVZWNHlQTDl3dmswbTYyV1QyS2daanc1UE92cXMifQ==')
		.expect(404)
		.expect("La serie no existe", done);		
	});
	
	it('DELETE /:id id no numérico', function(done) {
		supertest(app)
		.delete('/api/series/uno')
		.set('Authorization', 'Basic eyJpZCI6MSwibmlja25hbWUiOiJQZXBlIiwicGFzc3dvcmQiOiJwZXBlIiwidG9rZW4iOiJleUowZVhBaU9pSktWMVFpTENKaGJHY2lPaUpJVXpJMU5pSjkuZXlKc2IyZHBiaUk2SWxCbGNHVWlMQ0psZUhBaU9qRTBORGMxT0RBMk5qRXdPRGw5LmYzSG5BN1BjaGhoQk45bVZWNHlQTDl3dmswbTYyV1QyS2daanc1UE92cXMifQ==')
		.expect(400)
		.expect("Error: El id no es un número", done);		
	});
	
});