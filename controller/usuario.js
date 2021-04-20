'use strict'

var UsuarioSchema =  require('../model/usuario');
var bcrypt = require('bcrypt-nodejs');

function save(req, res) {

    var usuario = new UsuarioSchema();
    var params = req.body;

    if(params.nombre && params.correo && params.clave) {

        usuario.nombre =  params.nombre;
        usuario.apellido =  params.apellido;
        usuario.correo =  params.correo.toLowerCase();
        usuario.clave =  params.clave;
        usuario.rol = 'ROLE_USER';

        UsuarioSchema.findOne({
            correo: usuario.correo.toLowerCase(), 
        }, (err, existeUsuario)  => {
            if(err) {
                res.status(500).send({ 
                    message: 'Error en el servidor.'
                });
            } else {
                if(existeUsuario) {
                    res.status(200).send({ 
                        message: 'El usuario ya se encuentra registrado.'
                    });
                } else {

                    bcrypt.hash(usuario.clave, null, null, function(err, hash) {
                        usuario.clave = hash;
                        if(err) {
                            res.status(500).send({ 
                                message: 'Error de codificacion.'
                            });
                        } else {
                            usuario.save((err, nuevoUsuario) => {
                                if(err) {
                                    res.status(500).send({ 
                                        message: 'Error | Usuario no registrado.'
                                    });
                                } else {
                                    if(nuevoUsuario) {
                                        res.status(201).send({ 
                                            message: 'Usuario Registrado.',
                                            'usuario': nuevoUsuario
                                        });
                                    } else {
                                        res.status(404).send({ 
                                            message: 'Usuario no encontrado.'
                                        });
                                    }
                                }
                            });
        
                        }
                    } );

                }
            }
        });
        



    } else {
        res.status(400).send({ 
            message: 'Datos insuficientes'
        });
    }

}

function login(req, res) {

    var params = req.body;

    var correo = params.correo.toLowerCase();
    var clave = params.clave;

    UsuarioSchema.findOne({
        'correo': correo 
    }, (err, existeUsuario) => {
        if(err) {
            res.status(500).send({
                message: 'Error en el Servidor'
            });
        } else {
            if(existeUsuario) {

                bcrypt.compare(clave, existeUsuario.clave, (err, check) => {
                    if(check) {
                        existeUsuario.clave = undefined;
                        res.status(200).send({
                            'usuario': existeUsuario
                        });
                    } else {
                        res.status(404).send({
                            message: 'Datos Incorrectos, comprobar correo/clave.'
                        });
                    }
                });

            } else {
                res.status(404).send({
                    message: 'Datos Incorrectos, comprobar correo/clave.'
                });
            }
        }
    });

}

module.exports = {
    save,
    login
}