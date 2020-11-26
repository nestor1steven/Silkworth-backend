/* 
    Productos
    /api/productos
*/


const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');

const { validarJWT } = require('../middlewares/validar-jwt');


const {
    getProductos,
    crearProducto,
    actualizarProducto,
    borrarProducto,
} = require('../controllers/productos')


const router = Router();

router.get( '/' ,getProductos);

router.post( '/', 
[
    validarJWT,
    check('titulo', 'El titulo esta vacio').not().isEmpty(),
    check('tipo', 'El tipo esta vacio').not().isEmpty(),
    check('autor', 'El autor esta vacio').not().isEmpty(),
    check('duracion', 'La duracion esta vacia').not().isEmpty(),
    check('precio', 'El precio esta vacio').not().isEmpty(),
    check('stock', 'El stock esta vacio').not().isEmpty(),
    validarCampos
], 
crearProducto);


router.put( '/:id', 
    [],
    actualizarProducto);

    
router.delete( '/:id',
    validarJWT,
    borrarProducto
    );



module.exports = router;   