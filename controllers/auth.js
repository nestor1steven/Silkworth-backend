const { response } = require('express');
const bcrypt = require('bcryptjs');
const Usuario = require('../models/usuario');
const { generarJWT } = require('../helpers/jwt');

const login = async(req, res = Response) => {

    //Extraeremos el login y password del
    const { email, password } = req.body;

    try {

        //Verificar email
        const usuarioDB = await Usuario.findOne({ email});

        if( !usuarioDB) {
            return res.status(404).json({
                ok: false,
                msg: 'Email no encontrado'
            })
        }


        //verificar contraseña
        //compareSync: Hace una comparacion de dos contraseña y si hacen match regresa un TRUE
        const validPassword = bcrypt.compareSync( password, usuarioDB.password);

        if( !validPassword ) {
            return res.status(400).json({
                ok: false,
                msg: 'Contraseña no es valida'
            })
        }


        //Generamos un TOKEN - JWT
        const token = await generarJWT( usuarioDB.id );

        res.json({
            ok: true,
            token
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado...' 
        });
    }
}

module.exports = {
    login
}