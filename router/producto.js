'use strict'

var express = require('express');

var productoController = require('../controller/producto');

var api = express.Router();

api.post('/registro', productoController.save);

module.exports =  api;