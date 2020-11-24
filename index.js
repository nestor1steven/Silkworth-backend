require('dotenv').config();

const express = require('express');
var cors = require('cors');


//Importamos la conexion 
const { dbConnection } = require('./database/config');
//CREAR EL SERVIDOR EXPRESS
const app = express();

//Configurar CORS
app.use(cors())

//Lectura y parseo del body
app.use ( express.json() );

//Base de datos
dbConnection();

//Rutas
app.use( '/api/usuarios', require('./routes/usuarios') );
app.use( '/api/login', require('./routes/auth') );


//Sirve para escuchar el puerto
app.listen( process.env.PORT, () => {
    console.log('Servidor corriendo en puerto '+ process.env.PORT);
} )