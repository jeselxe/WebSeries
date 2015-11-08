var jwt = require('jwt-simple');
var moment = require('moment');
var models = require('./models');
var config = require('./config')

function decodeToken(token) {
	var decoded = {};
	try {
		decoded = jwt.decode(token, config.secret);
	}
	catch (err){
		console.log(err);
	}
	return decoded;
}
 
function generateToken(payload) {
	var token = jwt.encode(payload, config.secret);
	return token;
}

function desencriptarBase64(basic) {
	var credentials = new Buffer(basic.split(' ')[1], 'base64').toString('utf8').split(":");
	var user = {
		nickname: credentials[0],
		password: credentials[1]
	}
	return user;
}

function encriptarBase64(usuario) {
	var encriptado = new Buffer(usuario).toString('base64');
	return encriptado;
}

function getUserByToken(token) {
	
	var decoded = decodeToken(token, config.secret);
	decoded.login = decoded.login || '';
	
	return models.Usuario.find({
		where: {
			token : token,
			nickname: decodeToken(token, config.secret).login
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

function getUserAuthorized(req) {
	if (req.query.access_token) {
		return getUserByToken(req.query.access_token);
	}
	else if (req.headers.authorization){
		return getUserByBasicAuthorization(req.headers.authorization);
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
			
			var basicUser = user.nickname + ":" + user.password;
			
			var authorization = {
				basic : encriptarBase64(basicUser),
				token : token
			}
			
			res.header('Authorization', 'Bearer ' + token);
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
		res.header('WWW-Authenticate', 'Basic realm="realm WebSeries"');
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