const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares');
const {
    backlogGet,
    backlogPost,
    backlogPut,
    backlogDelete
} = require('../controllers/backlog');



const router = Router();

router.get('/', backlogGet);

router.post('/', backlogPost);

router.put('/:id', [
    check('id', 'No es un ID válido').isMongoId(),
    validarCampos
], backlogPut)

router.delete('/:id', [
    check('id', 'No es un ID válido').isMongoId(),
    validarCampos
], backlogDelete);

module.exports = router;