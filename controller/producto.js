'use strict'

var ProductoModel = require('../model/producto');

function save(req, res) {

    var producto = new ProductoModel();

    var params =  req.body;
    
    if(params.codigo && params.precio && params.nombre) {

        producto.nombre = params.nombre;
        producto.codigo = params.codigo;
        producto.precio = params.precio;
        producto.categoria = params.categoria;
        producto.descripcion = params.descripcion;

        producto.save((err, productoStored) => {

            if(err) {
                res.status(500).send({
                    message: 'No se guardo el registro.'
                });
            } else {
                res.status(200).send({
                    'producto': productoStored
                });
            }

        });
    } else {
        res.status(200).send({
            message: 'Falta datos para el registro.'
        });
    }
}


function getProducto(req, res) {
    ProductoModel.find({}).exec((err, productos) => {
        if(err) {
            res.status(500).send({
                message: 'Error de conexion'
            });
        } else {
            if(productos) {
                res.status(200).send(
                    {
                        'productos': productos
                    }
                );
            } else {
                res.status(404).send({
                    message: 'No hay registros.'
                });
            }
        }
    });
}

module.exports = {
    save,
    getProducto
}