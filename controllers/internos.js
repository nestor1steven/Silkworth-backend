const { response } = require("express");
const Interno = require('../models/interno');

const getInternos = async(req, res = response) => {

    const desde = Number(req.query.desde) || 0;

    //Promise.all: Ejecuta todas estas promesas de manera simultanea
    const [ internos, total] = await Promise.all([
        Interno.find()
                //Trae los campos de oros documentos
                .populate('usuario','nombre')
                //salta todos los registros antes de el (desde)
                .skip( desde )
                //limita el numero de registros que muestra
                .limit( 5 ),
        
        Interno.countDocuments()
    ]);

    res.json({
        ok: true,
        internos,
        total
    })
}

const crearInterno = async(req, res = response) => {

    const uid = req.uid;
    const interno = new Interno( { usuario: uid, ...req.body});

    console.log( interno ); 
    
    try {
        
        const internoDB = await interno.save();
        
        

        res.json({
            ok: true,
            interno: internoDB
        });
        
        
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: "Hable con el admin"
        })  
        
    }


     

}

const actualizarInterno = (req, res = response) => {

    res.json({
        ok: true,
        msg: 'Actualizar interno'
    })
}

const borrarInterno = (req, res = response) => {

    res.json({
        ok: true,
        msg: 'Borrar interno'
    })
}


module.exports = {
    getInternos,
    crearInterno,
    actualizarInterno,
    borrarInterno,
}