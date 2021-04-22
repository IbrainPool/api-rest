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


function getProductos(req, res) {
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



function getProducto(req, res) {

    var productoId = req.params.id;
    ProductoModel.findById(productoId).exec((err, producto) => {
        if(err) {
            res.status(500).send({
                message: 'Error de conexion'
            });
        } else {
            if(producto) {
                res.status(200).send(
                    {
                        'producto': producto
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

function updateProductos(req, res) {

    var productoid = req.params.id;
    var productoUpdate = req.body;

    console.log(productoUpdate, productoid);
    ProductoModel.findByIdAndUpdate( productoid, productoUpdate, {upsert: true}, 
        function(err, updateProducto) {
        if(err) {
            res.status(500).send({
                message: 'Error en el servidor'
            });
        } else {
            console.log('actualizacion', updateProducto);
            if(updateProducto) {
                res.status(200).send({
                    'producto': updateProducto
                });
            } else {
                res.status(404).send({
                    message: 'Registro actualizado'
                });
            }
        }
    });
}


function removeProducto(req, res) {

    var productoid = req.params.id;

    ProductoModel.findByIdAndRemove(productoid,
        (err, updateProducto) => {
        if(err) {
            res.status(500).send({
                message: 'Error en el servidor'
            });
        } else {
            console.log('actualizacion', updateProducto);
            if(updateProducto) {
                res.status(200).send({
                    'producto': updateProducto
                });
            } else {
                res.status(404).send({
                    message: 'Registro no eliminado'
                });
            }
        }
    });
}
module.exports = {
    save,
    getProductos,
    getProducto,
    updateProductos,
    removeProducto
}