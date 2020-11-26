const { Schema, model} = require('mongoose');


//Este es el modelo para crear nuevos usuarios
const ProductoSchema = Schema({

    titulo: {
        type: String,
        required: true
    },
    tipo: {
        type: Number,
        required: true
    },
    autor: {
        type: String,
        required: true
    },
    descripcion: {
        type: String,
    },
    editorial: {
        type: String,
    },
    categoria: {
        type: String,
    },
    duracion: {
        type: String,
        required: true
    },
    precio: {
        type: Number,
        required: true
    },
    stock: {
        type: Number,
        required: true
    },
    fecha: {
        type: Date,
        required: true,
        default: '2016-05-18T16:00:00Z'
    },
    img: {
        type: String,
    },
    //usuario que lo creo
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario'
    },
    /* pedido: {
        type: Schema.Types.ObjectId,
        ref: 'Pedido'
    }, */
}, { collection: 'Productos' });

ProductoSchema.method('toJSON', function(){
    const { __v, ...object  } = this.toObject();
    return object
})


//Exportamos el modelo
module.exports = model( 'Producto', ProductoSchema );