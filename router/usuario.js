'use strict'

var express = require('express');

var usuarioController = require('../controller/usuario');
var md_auth =  require('../middlewares/authenticated');
var api = express.Router();


api.post('/registro', usuarioController.save);
api.post('/login', usuarioController.login);
api.put('/:id', [md_auth.ensureAuth, md_auth.ensureAuthAdmin], usuarioController.update);

module.exports =  api;