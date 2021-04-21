'use strict'

var express = require('express');

var productoController = require('../controller/producto');

var api = express.Router();

var md_auth =  require('../middlewares/authenticated');

api.post('/registro', [md_auth.ensureAuth], productoController.save);
api.get('/todos', [md_auth.ensureAuth], productoController.getProducto);

module.exports =  api;