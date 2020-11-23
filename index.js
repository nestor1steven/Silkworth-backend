require('dotenv').config();

const express = require('express');
var cors = require('cors');


//Importamos la conexion 
const { dbConnection } = require('./database/config');
//CREAR EL SERVIDOR EXPRESS
const app = express();

//Configurar CORS
app.use(cors())

//Base de datos
dbConnection();

//Rutas
app.get( '/', (req,res) => {
    res.json({
        ok: true,
        msg: 'Hola mundo'
    });
});


//Sirve para escuchar el puerto
app.listen( process.env.PORT, () => {
    console.log('Servidor corriendo en puerto '+ process.env.PORT);
} )