const { Router } = require('express');
const { check } = require('express-validator');

const { validarCampos } = require('../middlewares');


const {
    proyectosGet,
    proyectosPost,
    proyectosDelete
} = require('../controllers/proyecto');

const router = Router();

router.get('/', proyectosGet);

router.post('/', [
    check('nombre_proyecto', 'El nombre es obligatorio').not().isEmpty(),
    check('descripcion', 'La descripcion es obligatoria').not().isEmpty(),
    validarCampos
], proyectosPost);


router.delete('/:id', [
    check('id', 'No es un ID válido').isMongoId(),
    validarCampos
], proyectosDelete);

module.exports = router;