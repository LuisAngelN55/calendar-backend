const { response } = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/User-Model');
const { generateJWT } = require('../helpers/jwt');


const createUser = async(req, res = response ) => {

    const { email, password } = req.body;

    try {

        let user = await User.findOne({ email });

        if ( user ) {
            return res.status(400).json({
                ok: false,
                msg: 'Un usuario ya existe con este correo'
            });
        }

        user = new User( req.body );

        // Encriptar contraseña
        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync( password, salt );
    
        await user.save();
        // Generar JWT
        const token = await generateJWT( user.id, user.name );

    
        //Resultado correcto
        res.status(201).json({
            ok: true,
            uid: user.id,
            name: user.name,
            token,
        });
        
    } catch (error) {
        console.log(error);       
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador',
        });
    }

}

const loginUser = async(req, res = response ) => {

    const { email, password } = req.body;


    try {
        const user = await User.findOne({ email });

        if ( !user ) {
            return res.status(400).json({
                ok: false,
                msg: 'No se ha encontrado un usuario con este correo'
            });
        }

        // Confirmar los passwords
        const validPassword = bcrypt.compareSync( password, user.password );

        if ( !validPassword ) {
            return res.status(400).json({
                ok: false,
                msg: 'Password incorrecto'
            });
        }

        //TODO: Generar Json web token "JWT"
        const token = await generateJWT( user.id, user.name );

    //Resultado correcto
        res.json({
            ok: true,
            uid: user.id,
            name: user.name,
            token
        })


        
    } catch (error) {
        console.log(error);       
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador',
        });
    }

}

const renewToken = async(req, res = response ) => {

    const { uid, name } = req;

    const token = await generateJWT( uid, name );

    res.json({
        ok: true,
        token
    })
}

module.exports = {
    createUser,
    loginUser,
    renewToken,
}
