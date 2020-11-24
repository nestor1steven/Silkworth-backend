const { Schema, model} = require('mongoose');


//Este es el modelo para crear nuevos usuarios
const UsuarioSchema = Schema({

    nombre: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    img: {
        type: String,
    },
    rol: {
        type: String,
        required: true,
        default: 'USER_ROLE'
    },
    google: {
        type: Boolean,
        default: false

    },

});

UsuarioSchema.method('toJSON', function(){
    const { __v, _id, password, ...object  } = this.toObject();

    object.uid = _id;
    return object
})


//Exportamos el modelo
module.exports = model( 'Usuario', UsuarioSchema );