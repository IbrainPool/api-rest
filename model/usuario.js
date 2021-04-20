'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

mongoose.set('useFindAndModify', false);

var UsuarioSchema = Schema({
    nombre: String,
    apellido: String,
    correo: String,
    rol: String,
    clave: String
});

module.exports = mongoose.model('Usuario', UsuarioSchema);