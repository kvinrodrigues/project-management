const { Router } = require('express');
const { check } = require('express-validator');

const { validarCampos } = require('../middlewares');

const { existePermisoPorId } = require('../helpers/db-validators');


const {
    permisosGet,
    permisosPost,
    permisosPut,
    permisosDelete
} = require('../controllers/permiso');

const router = Router();

router.get('/', permisosGet);

router.post('/', [
    check('nombre_permiso', 'El nombre es obligatorio').not().isEmpty(),
    check('descripcion', 'La descripcion es obligatoria').not().isEmpty(),
    validarCampos
], permisosPost);

router.put('/:id', [

    check('nombre_permiso', 'El nombre es obligatorio').not().isEmpty(),
    check('id').custom(existePermisoPorId),
    validarCampos
], permisosPut);


router.delete('/:id', [
    check('id', 'No es un ID válido').isMongoId(),
    validarCampos
], permisosDelete);

module.exports = router;