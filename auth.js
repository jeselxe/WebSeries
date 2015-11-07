module.exports = function (req, res, next) {
	if(req.headers.authorization) {
		// console.log(new Buffer('{"user" : "admin", "password": "123456"}').toString('base64'));
		// OK: eyJ1c2VyIiA6ICJhZG1pbiIsICJwYXNzd29yZCI6ICIxMjM0NTYifQ==
		// KO: eyJ1c2VyIiA6ICJhZG1pbiIsICJwYXNzd29yZCI6ICJhYmNkZWYifQ==
		var userJSON = new Buffer(req.headers.authorization.split(' ')[1], 'base64').toString('utf8');
		var user = JSON.parse(userJSON);
		
		if(user.user == 'admin' && user.password == '123456') {
			next();
		} else {
			res.status(401).send("Usuario o password incorrectos");
		}
		
		
	}
	else {
		res.status(401).send("Debes autentificarte");
	}
};