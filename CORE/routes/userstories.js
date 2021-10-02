const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares');
const {
    storiesGet,
    storiesPost,
    storiesPut,
    storiesDelete
} = require('../controllers/userstories');



const router = Router();

router.get('/', storiesGet);

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