const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares');
const {
    storiesGet,
    storiesPost,
    storiesPut,
    storiesDelete,
    storiesGetByID,
} = require('../controllers/userstories');




const router = Router();

router.get('/', storiesGet);

router.get('/:id', [
    check('id', 'No es un id válido').isMongoId(),
    validarCampos
], storiesGetByID)

router.post('/', storiesPost);

router.put('/:id', [
    check('id', 'No es un ID válido').isMongoId(),
    validarCampos
], storiesPut)

router.delete('/:id', [
    check('id', 'No es un ID válido').isMongoId(),
    validarCampos
], storiesDelete);

module.exports = router;