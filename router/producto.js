'use strict'

var express = require('express');

var productoController = require('../controller/producto');

var api = express.Router();

var md_auth =  require('../middlewares/authenticated');

api.post('/registro', [md_auth.ensureAuth], productoController.save);
api.get('/todos', [md_auth.ensureAuth], productoController.getProductos);
api.get('/:id', [md_auth.ensureAuth], productoController.getProducto);
api.put('/actualizar/:id', [md_auth.ensureAuth], productoController.updateProductos);
api.delete('/:id', [md_auth.ensureAuth], productoController.removeProducto);

module.exports =  api;