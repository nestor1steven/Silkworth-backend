/* 
    Internos
    /api/internos
*/


const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');

const { validarJWT } = require('../middlewares/validar-jwt');


const {
    getInternos,
    crearInterno,
    actualizarInterno,
    borrarInterno
} = require('../controllers/internos')


const router = Router();

router.get( '/' ,getInternos);

router.post( '/', 
[
    validarJWT,
    check('nombre', 'El nombre del interno es necesario').not().isEmpty(),
    check('apellidos', 'Los apellidos del interno son necesario').not().isEmpty(),
    check('edad', 'La edad del interno es necesario').not().isEmpty(),
    check('peso', 'El peso del interno es necesario').not().isEmpty(),
    check('altura', 'La altura del interno es necesario').not().isEmpty(),
    validarCampos
], 
crearInterno );


router.put( '/:id', 
[
    validarJWT,
    check('nombre', 'El nombre del interno es necesario').not().isEmpty(),
    validarCampos
],
    actualizarInterno);

    
router.delete( '/:id',
    validarJWT,
    borrarInterno
    );



module.exports = router;   