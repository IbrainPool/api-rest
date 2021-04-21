'use strict'

var jwt = require('jwt-simple');
var moment = require('moment');
var secret = 'capacitacion2021';

exports.createToken =  function(usuario) {

    var payload = {
        sub: usuario._id,
        name: usuario.nombre,
        lastname: usuario.apellido,
        email: usuario.correo,
        role: usuario.rol,
        int: moment().unix(),
        exp: moment().add(1, 'day').unix() 
    };

    return jwt.encode(payload, secret);
};