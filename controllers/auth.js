const { response } = require('express');
const bcrypt = require('bcryptjs');
const Usuario = require('../models/usuario');
const { generarJWT } = require('../helpers/jwt');
const { googleVerify } = require('../helpers/google-verify');
const usuario = require('../models/usuario');

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


//AUTENTICACION DE GOOGLE

const googleSignIn = async(req, res = response) => {


    const googleToken = req.body.token;

    try {

        const {name, email, picture} = await googleVerify( googleToken );


        const usuarioDB = await Usuario.findOne({ email });
        let usuario;

        //Si no existe el usuario
        if( !usuarioDB ) {
            usuario = new Usuario({
                nombre: name,
                email,
                password: '@@@',
                img: picture,
                google: true
            });

        }else {
            // Existe el usuario
            usuario = usuarioDB;
            usuario.google = true;
        }



        // Guardar en la base de datos
        await usuario.save();


        //Generamos un TOKEN - JWT
        const token = await generarJWT( usuario.id );


        res.json({
            ok: true,
            token
        });


    } catch (error) {
            res.status(401).json({
                ok: false,
                msg: 'Token no es correcto',
            });

    }


    res.json({
        ok: true,
        msg: 'Google SignIn',
        googleToken
    });

}



const renewToken = async(req, res = response) => {


    const uid = req.uid;


    //Generamos un TOKEN - JWT
    const token = await generarJWT( uid );


    res.json({
        ok: true,
        token
    });


}

module.exports = {
    login,
    googleSignIn,
    renewToken
}