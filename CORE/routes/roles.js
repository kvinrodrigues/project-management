const {Router} = require('express');
const {check} = require('express-validator');

const {validarCampos, validarJWT, tieneRole} = require('../middlewares');

const {existeRolPorId} = require('../helpers/db-validators');


const {
    rolesGet,
    rolesPost,
    rolesPut,
    rolesDelete
} = require('../controllers/role');

const router = Router();

router.get('/',
    [
        validarJWT,
        tieneRole('CONSULTAR_ROL'),
    ],
    rolesGet);

router.post('/', [
    validarJWT,
    tieneRole('MODIFICAR_ROL'),
    check('rol', 'El nombre del ROL es obligatorio').not().isEmpty(),
    check('descripcion', 'La descripcion es obligatoria').not().isEmpty(),
    validarCampos
], rolesPost);

router.put('/:id', [
    validarJWT,
    tieneRole('MODIFICAR_ROL'),
    check('rol', 'El nombre del ROL es obligatorio').not().isEmpty(),
    check('id').custom(existeRolPorId),
    validarCampos
], rolesPut);


router.delete('/:id', [
    validarJWT,
    tieneRole('MODIFICAR_ROL'),
    check('id', 'No es un ID válido').isMongoId(),
    validarCampos
], rolesDelete);

module.exports = router;
