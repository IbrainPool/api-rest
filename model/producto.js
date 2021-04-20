'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

mongoose.set('useFindAndModify', false);

var ProductoSchema = Schema({
    nombre: String,
    codigo: String,
    precio: Number,
    descripcion: String,
    categoria: String
}, {
    versionKey: false
});

module.exports = mongoose.model('Producto', ProductoSchema);
//user, ventas, almacen 