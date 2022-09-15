const express = require('express');
require('dotenv').config();
const { dbConnection } = require('./database/config');

// Muestra todas las variables de entorno incluida las variables del .env
// console.log( process.env );

//* Crear el servidor de express
const app = express();

//* DataBase
dbConnection();


//* Directorio público
app.use( express.static('public') );


//* Lectura y parseo del body
app.use( express.json() );

//* Rutas
app.use('/api/auth', require('./routes/auth'));


//* Escuchar peticiones

app.listen( process.env.PORT, () => {
    console.log(`Servidor corriendo en puerto ${ process.env.PORT }`);
});