const { Schema, model} = require('mongoose');


//Este es el modelo para crear nuevos usuarios
const InternoSchema = Schema({

    nombre: {
        type: String,
        required: true
    },
    apellidos: {
        type: String,
        required: true
    },
    edad: {
        type: Number,
        required: true
    },
    peso: {
        type: Number,
        required: true
    },
    altura: {
        type: Number,
        required: true
    },
    fecNac: {
        type: Date,
        default: '2016-05-18T16:00:00Z'
    },
    fecOut: {
        type: Date,
        default: '2016-05-18T16:00:00Z'
    },
    fecIn: {
        type: Date,
        default: '2016-05-18T16:00:00Z'
    },
    conducto: {
        type: String,
        default: 'Persona'
    },
    psProseso: {
        type: String,
        default: 'Miguel Armando Mondragon'
    },
    psActual: {
        type: String,
        default: 'Veronica Sanchez Mercado'
    },
    egresado: {
        type: Boolean,
        default: false
    },
    img: {
        type: String,
    },
    usuario: {
        required: true,
        type: Schema.Types.ObjectId,
        ref: 'Usuario'
    },
}, { collection: 'internos' });

InternoSchema.method('toJSON', function(){
    const { __v, _id, ...object  } = this.toObject();

    object.uid = _id;
    return object
})


//Exportamos el modelo
module.exports = model( 'Interno', InternoSchema );