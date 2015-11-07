var jwt = require('jwt-simple');
var moment = require('moment');
var models = require('./models');

var secret='123456';

function decodeToken(token) {
	var decoded = jwt.decode(token, secret);
	return decoded;
}
 
function generateToken(payload) {
	var token = jwt.encode(payload, secret);
	return token;
}

function desencriptarBase64(basic) {
	var userJSON = new Buffer(basic.split(' ')[1], 'base64').toString('utf8');
	return JSON.parse(userJSON);
}

function getUserByToken(token) {
	return models.Usuario.find({
		where: {
			token : token,
			nickname: decodeToken(token, secret).login
		}
	});
}

function getUserByBasicAuthorization(basic) {
	var user = desencriptarBase64(basic);
		
	return models.Usuario.find({
		where: {
			nickname: user.user,
			password: user.password
		}
	});
}

function getUserAuthorized(token, basic) {
	if (token) {
		return getUserByToken(token);
	}
	else if (basic){
		return getUserByBasicAuthorization(basic);
	}
}

function newToken(usuario) {
	var token = generateToken({
		login: usuario.nickname,
		exp: moment().add(7, 'days').valueOf()
	});
	
	usuario.update({
		token: token
	});
	
	return token;
}

function login(req, res, next) {
	console.log(new Buffer('{"user" : "Pepe", "password": "pepe"}').toString('base64'));
	if (req.headers.authorization) {
		getUserByBasicAuthorization(req.headers.authorization).then(function (usuario) {
			if (usuario) {
				var token = newToken(usuario);
				res.header('Authorization', 'Bearer ' + token);
				
				next();
			}
			else {
				res.status(401).send("Usuario o password incorrectos");
			}
		});
	}
	else {
		res.status(401).send("Debes autentificarte");
	}
}

function checkAuth(req, res, next) {
	if(req.headers.authorization) {
		// OK: eyJ1c2VyIiA6ICJhZG1pbiIsICJwYXNzd29yZCI6ICIxMjM0NTYifQ==
		login(req, res, next);
	}
	else if(req.query.access_token) {
		
		getUserByToken(req.query.access_token).then(function (usuario) {
			if (usuario) {
				next();
			}
			else {
				res.status(401).send("Token inválido");
			}
		});
	}
	else {
		res.status(401).send("Debes autentificarte");
	}
};

module.exports = {
	checkAuth: checkAuth,
	getUserAuthorized: getUserAuthorized,
	getUserByToken: getUserByToken,
	getUserByBasicAuthorization: getUserByBasicAuthorization,
	login: login
}