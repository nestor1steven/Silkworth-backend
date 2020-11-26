const { response } = require("express");
const Usuario = require("../models/usuario");
const Interno = require("../models/interno");
const Producto = require("../models/producto");
const Pedido = require("../models/pedido");

const getTodo = async(req, res = response) => {

    const busqueda = req.params.busqueda; 
    //regex = Exprecion Regular
    const regex = new RegExp( busqueda, 'i');

    /* const usuarios = await Usuario.find({ nombre: regex});
    const internos = await Interno.find({ nombre: regex});
    const productos = await Producto.find({ titulo: regex});
    const pedidos = await Pedido.find({ calle: regex}); */

    const [ usuarios, internos, productos, pedidos] = await Promise.all([
        Usuario.find({ nombre: regex}),
        Interno.find({ nombre: regex}),
        Interno.find({ apellidos: regex}),
        Producto.find({ titulo: regex}),
        Pedido.find({ calle: regex})
    ]);

    res.json({
        ok: true,
        msg: "getTodo",
        usuarios,
        internos,
        productos,
        pedidos
    })
}


const getDocumentosColeccion = async(req, res = response) => {

    const tabla    = req.params.tabla; 
    const busqueda = req.params.busqueda; 
    //regex = Exprecion Regular
    const regex    = new RegExp( busqueda, 'i');

    let data = [];

    switch ( tabla ) {
        case 'usuarios':
                data = await Usuario.find({ nombre: regex});

            break;
            case 'internos':
                data = await Interno.find({ nombre: regex});
                
            break;
            case 'productos':
                data = await Producto.find({ titulo: regex});
                
            break;
            case 'pedidos':
                data = await Pedido.find({ calle: regex});
                
            break;
    
        default:
            return res.status(400).json({
                ok: false,
                msg: "Tabla no encontrada"
            });

        }
        
        res.json({
            ok: true,
            resultados: data
        })
    
}


module.exports = {
    getTodo,
    getDocumentosColeccion
}