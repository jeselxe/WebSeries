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

function encriptarBase64(usuario) {
	var encriptado = new Buffer(JSON.stringify(usuario)).toString('base64');
	return encriptado;
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
			nickname: user.nickname,
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
	models.Usuario.find({
		where : {
			nickname : req.body.user,
			password : req.body.password 
		},
		attributes : ['id', 'nickname', 'password']
	}).then(function (user) {
		if (user) {
			var token = newToken(user);
			res.header('Authorization', 'Bearer ' + token);
			var authorization = {
				basic : encriptarBase64(user),
				token : token
			}
			res.send(authorization);
			next();
		}
		else {
			res.status(401).send("Usuario o password incorrectos");
		}
	});
}

function checkAuth(req, res, next) {
	if(req.headers.authorization) {
		getUserByBasicAuthorization(req.headers.authorization).then(function (usuario) {
			if (usuario) {
				next();
			}
			else {
				res.status(401).send("Usuario o password incorrectos");
			}
		});
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