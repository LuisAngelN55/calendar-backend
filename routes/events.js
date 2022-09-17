
/*
    //* Rutas de usuarios / events
    Host + /api/events
*/

const { Router } = require('express');
const router = Router();
const { validateJWT } = require('../middlewares/jwt-validation');


const { getEvents, createEvent, updatetEvent, deleteEvent } = require('../controllers/events');


// All request must pass through JMT validations
router.use( validateJWT );

// Obtain events
router.get('/', getEvents);

// Create events
router.post( '/', createEvent );

// Update events
router.put( '/:id', updatetEvent );

// Delete events
router.delete( '/:id', deleteEvent );

module.exports = router;