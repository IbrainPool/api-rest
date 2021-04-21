'use strict'

var jwt = require('jwt-simple');
var moment = require('moment');
var secret = 'capacitacion2021';

exports.ensureAuth =  function (req, res, next) {

    if(!req.headers.authorization) {
        return res.status(403).send({
            message: 'Acceso Not Autorizado'
        });
    }

    var token = req.headers.authorization.replace(/['"]+/g, '');

    try {

        var payload = jwt.decode(token, secret);
   
        if(payload.sub && (payload.exp <= moment().unix())) {
            return res.status(401).send({
                message: 'El token ha expirado.'
            });
        }
    } catch (ex) {
        console.error(ex);
        return res.status(500).send({
            message: 'Token Invalid'
        });
    }

    req.user = payload;
    next();
};
