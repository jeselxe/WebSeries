var app = require('../app');
var supertest = require('supertest');
var assert = require('assert');

describe('Pruebas de Series', function () {
	
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
	
});