'use strict'

var mongoose = require('mongoose');

var app =  require('./app');
var port = process.env.port || 3789;

mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost:27017/productos', { useNewUrlParser: true })
    .then(() => {
        console.log('La conexion de base de datos a mongodb se ha realizado');

        app.listen(port, () => {
            console.log('Los servicios de NodeJs esta corriendo...');
        });

    })
    .catch( err => {
        console.error('Error de conexion.');
        console.error(err);
    });
 
