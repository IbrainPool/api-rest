'use strict'

var express = require('express');

var usuarioController = require('../controller/usuario');

var api = express.Router();

api.post('/registro', usuarioController.save);
api.post('/login', usuarioController.login);

module.exports =  api;