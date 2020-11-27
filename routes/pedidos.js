/* 
    Pedidos
    /api/pedidos
*/


const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');

const { validarJWT } = require('../middlewares/validar-jwt');


const {
    getPedidos,
    crearPedidos,
    actualizarPedidos,
    borrarPedidos,
} = require('../controllers/pedidos')


const router = Router();

router.get( '/' ,getPedidos);

router.post( '/', 
[
    validarJWT,
    check('calle', 'La calle esta vacia').not().isEmpty(),
    check('numero', 'El numero esta vacio').not().isEmpty(),
    check('colonia', 'La colonia esta vacia').not().isEmpty(),
    check('municipio', 'El municipio esta vacio').not().isEmpty(),
    check('estado', 'El estado esta vacio').not().isEmpty(),
    check('estatus', 'El estatus esta vacio').not().isEmpty(),
    check('cp', 'La cp esta vacia').not().isEmpty(),
    check('telefono', 'El telefono esta vacio').not().isEmpty(),
    check('referencias', 'Las referencias estan vacias').not().isEmpty(),
    check('fecha', 'La fecha esta vacia').not().isEmpty(),
    check('producto', 'El id de producto debe de ser valido').isMongoId(),
    validarCampos
], 
crearPedidos);


router.put( '/:id', 
    [
        validarJWT,
        check('calle', 'La calle esta vacia').not().isEmpty(),
        validarCampos
    ],
    actualizarPedidos);

    
router.delete( '/:id',
    validarJWT,
    borrarPedidos
    );



module.exports = router;   