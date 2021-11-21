const { Router } = require('express');
const { check } = require('express-validator');

const { validarCampos } = require('../middlewares');


const {
    proyectosGet,
    proyectosPost,
    proyectosPut,
    proyectosDelete,
    proyectosGetByID
} = require('../controllers/proyecto');

const router = Router();

router.get('/', proyectosGet);

router.get('/:id', [
    check('id', 'No es un ID válido').isMongoId(),
    validarCampos
], proyectosGetByID)

router.post('/', [
    check('nombre_proyecto', 'El nombre es obligatorio').not().isEmpty(),
    check('descripcion', 'La descripcion es obligatoria').not().isEmpty(),
    validarCampos
], proyectosPost);

router.put('/:id', [
    check('id', 'No es un ID válido').isMongoId(),
    validarCampos
], proyectosPut)


router.delete('/:id', [
    check('id', 'No es un ID válido').isMongoId(),
    validarCampos
], proyectosDelete);

module.exports = router;