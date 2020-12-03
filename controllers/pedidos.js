const { response } = require("express");
const Pedido = require('../models/pedido');


const getPedidos = async(req, res = response) => {

    const desde = Number(req.query.desde) || 0;

    //Promise.all: Ejecuta todas estas promesas de manera simultanea
    const [ pedidos, total] = await Promise.all([
        Pedido.find()
                //Trae los campos de oros documentos
                .populate('usuario','nombre')
                .populate('producto','titulo precio img')
                //salta todos los registros antes de el (desde)
                .skip( desde )
                //limita el numero de registros que muestra
                .limit( 5 ),
        
        Pedido.countDocuments()
    ]);



    res.json({
        ok: true,
        pedidos,
        total
    })
}

const crearPedidos = async(req, res = response) => {

    const uid = req.uid;
    const pedido = new Pedido( { usuario: uid, ...req.body});


    try {

        const pedidoDB = await pedido.save();
        
        res.json({
            ok: true,
            pedido: pedidoDB
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: "Hable con el admin"
        })  
    }
}

const actualizarPedidos = async(req, res = response) => {

    const id = req.params.id;
    const uid = req.uid;

    try {
        
        const pedido = await Pedido.findById( id );

        if ( !pedido ) {
            return res.status(404).json({
                ok: true,
                msg: 'Pedido no encontrado'
            });

        }

        const cambiosPedido = {
            ...req.body,
            usuario: uid 
        }

        const pedidoActualizado = await Pedido.findByIdAndUpdate( id, cambiosPedido, { new:true } );

        res.json({
            ok: true,
            pedido: pedidoActualizado
        });


    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'No se pudo actualizar el Pedido'
        });
    }
}

const borrarPedidos = async(req, res = response) => {

    const id = req.params.id;

    try {
        
        const pedido = await Pedido.findById( id );

        if ( !pedido ) {
            return res.status(404).json({
                ok: true,
                msg: 'Pedido no encontrado'
            });

        }


        await Pedido.findByIdAndDelete( id );

        res.json({
            ok: true,
            msg: 'Pedido eliminado'
        });


    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'No se pudo eliminar el Pedido'
        });
    }
}


module.exports = {
    getPedidos,
    crearPedidos,
    actualizarPedidos,
    borrarPedidos,
}