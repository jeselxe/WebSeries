module.exports = function (req, res, next) {
	if(req.headers.authorization) {
		//console.log(new Buffer("{user : 'admin', password: '123456'}").toString('base64'));
		var userJSON = new Buffer(req.headers.authorization.split(' ')[1], 'base64').toString('ascii') ;
		console.log(userJSON);
		//var user = JSON.parse(userJSON);
		//console.log("USER: " + user.user + ", PASS: " + user.password);
		next();
	}
	else {
		res.status(401).send("Debes autentificarte");
	}
};