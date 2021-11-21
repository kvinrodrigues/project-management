const {Router} = require('express');
const {check} = require('express-validator');
const {validarCampos, tieneRole, validarJWT} = require('../middlewares');
const {
    storiesGet,
    storiesPost,
    storiesPut,
    storiesDelete,
    storiesGetByID,
} = require('../controllers/userstories');


<<<<<<< HEAD


=======
>>>>>>> a80f89d6ac575b909607052b46ff8f96f7cc7b9e
const router = Router();

router.get('/', [
        validarJWT,
        tieneRole('CONSULTAR_USERSTORIES')
    ],
    storiesGet);

<<<<<<< HEAD
router.get('/:id', [
    check('id', 'No es un id válido').isMongoId(),
    validarCampos
], storiesGetByID)

router.post('/', storiesPost);
=======
router.post('/', [
    validarJWT,
    tieneRole('MODIFICAR_USERSTORIES'),
], storiesPost);
>>>>>>> a80f89d6ac575b909607052b46ff8f96f7cc7b9e

router.put('/:id', [
    validarJWT,
    tieneRole('MODIFICAR_USERSTORIES'),
    check('id', 'No es un ID válido').isMongoId(),
    validarCampos
], storiesPut)

router.delete('/:id', [
    validarJWT,
    tieneRole('MODIFICAR_USERSTORIES'),
    check('id', 'No es un ID válido').isMongoId(),
    validarCampos
], storiesDelete);

module.exports = router;
