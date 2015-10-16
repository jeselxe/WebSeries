var express = require('express');

var app = express();

var PORT = 8000;

app.listen(PORT, function () {
	console.log("Server running on port " + PORT);
});