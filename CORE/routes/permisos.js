const {Router} = require('express');
const {check} = require('express-validator');

const {validarCampos, validarJWT, tieneRole} = require('../middlewares');

const {existePermisoPorId} = require('../helpers/db-validators');

const {
    permisosGet,
    permisosPost,
    permisosPut,
    permisosDelete
} = require('../controllers/permiso');

const router = Router();

router.get('/', [
    // validarJWT,
    // tieneRole('CONSULTAR_PERMISO'),
], permisosGet);

router.post('/', [
    // validarJWT,
    // tieneRole('MODIFICAR_PERMISO'),
    check('nombre_permiso', 'El nombre es obligatorio').not().isEmpty(),
    check('descripcion', 'La descripcion es obligatoria').not().isEmpty(),
    validarCampos
], permisosPost);

router.put('/:id', [
    // validarJWT,
    // tieneRole('MODIFICAR_PERMISO'),
    check('nombre_permiso', 'El nombre es obligatorio').not().isEmpty(),
    check('id').custom(existePermisoPorId),
    validarCampos
], permisosPut);


router.delete('/:id', [
    // validarJWT,
    // tieneRole('MODIFICAR_PERMISO'),
    check('id', 'No es un ID válido').isMongoId(),
    validarCampos
], permisosDelete);

module.exports = router;
