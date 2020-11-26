const { response } = require("express");
const Producto = require('../models/producto');

const getProductos = async(req, res = response) => {

    const desde = Number(req.query.desde) || 0;

    //Promise.all: Ejecuta todas estas promesas de manera simultanea
    const [ productos, total] = await Promise.all([
        Producto.find()
                //Trae los campos de oros documentos
                .populate('usuario','nombre')
                //salta todos los registros antes de el (desde)
                .skip( desde )
                //limita el numero de registros que muestra
                .limit( 5 ),
        
        Producto.countDocuments()
    ]);


    res.json({
        ok: true,
        productos,
        total
    })
}

const crearProducto = async(req, res = response) => {

    const uid = req.uid;
    console.log( uid ); 
    const producto = new Producto( { usuario: uid, ...req.body});


    try {

        const productoDB = await producto.save();
        
        res.json({
            ok: true,
            producto: productoDB
        })
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: "Hable con el admin"
        })  
    }

}

const actualizarProducto = (req, res = response) => {

    res.json({
        ok: true,
        msg: 'Actualizar Producto'
    })
}

const borrarProducto = (req, res = response) => {

    res.json({
        ok: true,
        msg: 'Borrar Producto'
    })
}


module.exports = {
    getProductos,
    crearProducto,
    actualizarProducto,
    borrarProducto,
}