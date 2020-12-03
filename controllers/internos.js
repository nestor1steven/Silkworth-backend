const { response } = require("express");
const Interno = require('../models/interno');
const { generarJWT } = require('../helpers/jwt');

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

const getUnInterno = async(req, res = response) => {
    
    const id = req.params.id;

    try {
        
        const interno = await Interno.findById( id );

        if ( !interno ) {
            return res.status(404).json({
                ok: true,
                msg: 'Interno no encontrado'
            });

        }
        

        res.json({
            ok: true,
            interno
        });


    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'No se pudo actualizar el Interno'
        });
    }
}

const crearInterno = async(req, res = response) => {

    const uid = req.uid;
    const interno = new Interno( { usuario: uid, ...req.body});

    
    try {
        
        const internoDB = await interno.save();
        
        

        //Generamos un TOKEN - JWT
        const token = await generarJWT( interno.id );
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

const actualizarInterno = async(req, res = response) => {

    const id = req.params.id;
    const uid = req.uid;

    try {
        
        const interno = await Interno.findById( id );

        if ( !interno ) {
            return res.status(404).json({
                ok: true,
                msg: 'Interno no encontrado'
            });

        }

        const cambiosInterno = {
            ...req.body,
            usuario: uid 
        }

        const internoActualizado = await Interno.findByIdAndUpdate( id, cambiosInterno, { new:true } );

        res.json({
            ok: true,
            interno: internoActualizado
        });


    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'No se pudo actualizar el Interno'
        });
    }

}

const borrarInterno = async(req, res = response) => {

    const id = req.params.id;

    try {
        
        const interno = await Interno.findById( id );

        if ( !interno ) {
            return res.status(404).json({
                ok: true,
                msg: 'Interno no encontrado'
            });

        }

        

        const internoEliminado = await Interno.findByIdAndDelete( id );

        res.json({
            ok: true,
            msg: 'Interno eliminado'
        });


    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'No se pudo eliminar el Interno'
        });
    }
}


module.exports = {
    getInternos,
    crearInterno,
    actualizarInterno,
    borrarInterno,
    getUnInterno
}