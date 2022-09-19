
/*
    //* Rutas de usuarios / events
    Host + /api/events
*/

const { Router } = require('express');
const router = Router();
const { check } = require('express-validator');
const { fieldValidations } = require('../middlewares/field-validation');
const { validateJWT } = require('../middlewares/jwt-validation');
const { isDate } = require('../helpers/isDate');


const { getEvents, createEvent, updatetEvent, deleteEvent } = require('../controllers/events');


// All request must pass through JMT validations
router.use( validateJWT );

// Obtain events
router.get(
    '/',

    getEvents);

// Create events
router.post(
    '/',
    [
        check( 'title', 'El título es obligatorio').not().isEmpty(),
        check( 'start', 'La fecha de inicio es obligatoria').custom( isDate ),
        check( 'end', 'La fecha de finalización es obligatoria').custom( isDate ),
        fieldValidations
    ],
    createEvent );

// Update events
router.put(
    '/:id',
    [
        check( 'title', 'El título es obligatorio').not().isEmpty(),
        check( 'start', 'La fecha de inicio es obligatoria').custom( isDate ),
        check( 'end', 'La fecha de finalización es obligatoria').custom( isDate ),
        fieldValidations
    ],
    updatetEvent );

// Delete events
router.delete( '/:id', deleteEvent );

module.exports = router;