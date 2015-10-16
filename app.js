var express = require('express');
var bodyParser = require('body-parser');

var series = require('./routes/series');
var usuario = require('./routes/usuario');
var models = require('./models');

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api/series', series);
app.use('/api/usuario', usuario);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
// no stacktraces leaked to user unless in development environment
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: (app.get('env') === 'development') ? err : {}
    });
});

module.exports = app;

// Crea la tabla si no existe
//Usuario.sync();
//Crear usuario
//var u = Usuario.build({login:'pepe', password:'pepe', birth_date:'1994-04-12'});
//Instert into database
//u.save();
//Insert con promise para llamar cuando termine
// si solo hay una funcion se ejecuta cuando termine, si hay dos la primera es si es correcto y la segunda cuando hay errores
//u.save().then(function(usu){console.log(usu.login)}, function(){});
//u.create() es igual a build + save