const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos, tieneRole, validarJWT } = require('../middlewares');

const {
    sprintGet,
    sprintGetByID,
    sprintPost,
    sprintPut,
    sprintDelete
} = require('../controllers/sprint');
const { existeSprintPorId } = require('../helpers/db-validators');


const router = Router();

router.get('/', [
    validarJWT,
    tieneRole('CONSULTAR_SPRINT'),
    validarCampos

], sprintGet);

router.get('/:id', [
    validarJWT,
    tieneRole('CONSULTAR_SPRINT'),
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existeSprintPorId),
    validarCampos
], sprintGetByID)

router.post('/', sprintPost)

router.put('/:id', [
    validarJWT,
    tieneRole('MODIFICAR_SPRINT'),
    check('id', 'No es un ID válido').isMongoId(),
    validarCampos

], sprintPut)

router.delete('/:id', [
    validarJWT,
    tieneRole('MODIFICAR_SPRINT'),
    check('id', 'No es un ID válido').isMongoId(),
    validarCampos
], sprintDelete)
module.exports = router;