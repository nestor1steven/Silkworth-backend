const { response } = require("express");
const Pedido = require('../models/pedido');


const getPedidos = async(req, res = response) => {

    const desde = Number(req.query.desde) || 0;

    //Promise.all: Ejecuta todas estas promesas de manera simultanea
    const [ pedidos, total] = await Promise.all([
        Pedido.find()
                //Trae los campos de oros documentos
                .populate('usuario','nombre')
                .populate('producto','titulo')
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
    console.log( uid ); 
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

const actualizarPedidos = (req, res = response) => {

    res.json({
        ok: true,
        msg: 'Actualizar Pedidos'
    })
}

const borrarPedidos = (req, res = response) => {

    res.json({
        ok: true,
        msg: 'Borrar Pedidos'
    })
}


module.exports = {
    getPedidos,
    crearPedidos,
    actualizarPedidos,
    borrarPedidos,
}