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

const actualizarProducto = async(req, res = response) => {

    const id = req.params.id;
    const uid = req.uid;

    try {
        
        const producto = await Producto.findById( id );

        if ( !producto ) {
            return res.status(404).json({
                ok: true,
                msg: 'Producto no encontrado'
            });

        }

        const cambiosProducto = {
            ...req.body,
            usuario: uid 
        }

        const productoActualizado = await Producto.findByIdAndUpdate( id, cambiosProducto, { new:true } );

        res.json({
            ok: true,
            producto: productoActualizado
        });


    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'No se pudo actualizar el producto'
        });
    }

}

const borrarProducto = async(req, res = response) => {

    const id = req.params.id;

    try {
        
        const producto = await Producto.findById( id );

        if ( !producto ) {
            return res.status(404).json({
                ok: true,
                msg: 'Producto no encontrado'
            });

        }


        await Producto.findByIdAndDelete( id );

        res.json({
            ok: true,
            msg: 'Producto Eliminado'
        });


    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'No se pudo eliminar el producto'
        });
    }


}


module.exports = {
    getProductos,
    crearProducto,
    actualizarProducto,
    borrarProducto,
}