const { Schema, model} = require('mongoose');


//Este es el modelo para crear nuevos usuarios
const PedidoSchema = Schema({

    calle: {
        type: String,
        required: true
    },
    numero: {
        type: Number,
        required: true
    },
    colonia: {
        type: String,
        required: true
    },
    municipio: {
        type: String,
        required: true
    },
    estado: {
        type: String,
        required: true
    },
    estatus: {
        type: String,
        required: true
    },
    cp: {
        type: String,
        required: true
    },
    telefono: {
        type: Number,
        required: true
    },
    referencias: {
        type: String,
        required: true
    },
    fecha: {
        type: Date,
        required: true,
        default: '2020/05/05'
    },
    //usuario que lo creo
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    },
    producto: {
        type: Schema.Types.ObjectId,
        ref: 'Producto',
        required: true
    },
}, { collection: 'Pedidos' });

PedidoSchema.method('toJSON', function(){
    const { __v, ...object  } = this.toObject();
    return object
})


//Exportamos el modelo
module.exports = model( 'Pedido', PedidoSchema );