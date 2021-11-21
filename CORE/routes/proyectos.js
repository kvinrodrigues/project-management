const { Router } = require('express');
const { check } = require('express-validator');

const { validarCampos, tieneRole, validarJWT} = require('../middlewares');


const {
    proyectosGet,
    proyectosPost,
    proyectosPut,
    proyectosDelete
} = require('../controllers/proyecto');

const router = Router();

router.get('/', proyectosGet);

router.post('/', [
    validarJWT,
    tieneRole('CONSULTAR_PROYECTO'),
    check('nombre_proyecto', 'El nombre es obligatorio').not().isEmpty(),
    check('descripcion', 'La descripcion es obligatoria').not().isEmpty(),
    validarCampos
], proyectosPost);

router.put('/:id', [
    validarJWT,
    tieneRole('MODIFICAR_PROYECTO'),
    check('id', 'No es un ID válido').isMongoId(),
    validarCampos
], proyectosPut)


router.delete('/:id', [
    validarJWT,
    check('id', 'No es un ID válido').isMongoId(),
    validarCampos
], proyectosDelete);

module.exports = router;
