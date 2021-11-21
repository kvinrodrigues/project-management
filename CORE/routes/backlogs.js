const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos, tieneRole, validarJWT } = require('../middlewares');
const {
    backlogGet,
    backlogGetByID,
    backlogPost,
    backlogPut,
    backlogDelete
} = require('../controllers/backlog');



const router = Router();

router.get('/', [
    validarJWT,
    tieneRole('CONSULTAR_BACKLOG'),
], backlogGet);

router.get('/:id', [
    validarJWT,
    tieneRole('CONSULTAR_BACKLOG'),
    check('id', 'No es un ID válido').isMongoId(),
    validarCampos
], backlogGetByID)

router.post('/', backlogPost);

router.put('/:id', [
    validarJWT,
    tieneRole('MODIFICAR_BACKLOG'),
    check('id', 'No es un ID válido').isMongoId(),
    validarCampos
], backlogPut)

router.delete('/:id', [
    validarJWT,
    tieneRole('MODIFICAR_BACKLOG'),
    check('id', 'No es un ID válido').isMongoId(),
    validarCampos
], backlogDelete);

module.exports = router;