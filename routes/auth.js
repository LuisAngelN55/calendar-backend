/*
    //* Rutas de usuarios / Auth
    Host + /api/auth
*/

// const express = require('express');
// const router = express.Router;

const { Router } = require('express');
const { check } = require('express-validator');
const { fieldValidations } = require('../middlewares/field-validation');
const router = Router();

const { createUser, loginUser, renewToken } = require('../controllers/auth')
const { validateJWT } = require('../middlewares/jwt-validation');

router.post( 
    '/new', 
    [ //Middelwares
        check('name', 'El nombre es obligatorio').not().isEmpty(),
        check('email', 'El email es obligatorio').isEmail(),
        check('password', 'El password debe ser de 6 caracteres').isLength({ min: 6 }),
        fieldValidations
    ], 
    createUser );


router.post( 
    '/',
    [ //Middelwares
        check('email', 'El email es obligatorio').isEmail(),
        check('password', 'El password debe ser de 6 caracteres').isLength({ min: 6 }),
        fieldValidations
    ], 
    loginUser );


router.get( '/renew', validateJWT, renewToken );


module.exports = router;