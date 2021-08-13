const { Router } = require('express');
const { check } = require('express-validator');

const { validarCampos } = require('../middlewares');

const { existeRolPorId } = require('../helpers/db-validators');


const {
    rolesGet,
    rolesPost,
    rolesPut,
    rolesDelete
} = require('../controllers/role');

const router = Router();

router.get('/', rolesGet);

router.post('/', [
    check('rol', 'El nombre del ROL es obligatorio').not().isEmpty(),
    check('descripcion', 'La descripcion es obligatoria').not().isEmpty(),
    validarCampos
], rolesPost);

router.put('/:id', [

    check('rol', 'El nombre del ROL es obligatorio').not().isEmpty(),
    check('id').custom(existeRolPorId),
    validarCampos
], rolesPut);


router.delete('/:id', [
    check('id', 'No es un ID válido').isMongoId(),
    validarCampos
], rolesDelete);

module.exports = router;