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

//Directorio publico
app.use( express.static('public'));

//Rutas
app.use( '/api/usuarios', require('./routes/usuarios') );
app.use( '/api/internos', require('./routes/internos') );
app.use( '/api/productos', require('./routes/productos') );
app.use( '/api/pedidos', require('./routes/pedidos') );
app.use( '/api/login', require('./routes/auth') );
app.use( '/api/todo', require('./routes/busquedas') );
app.use( '/api/upload', require('./routes/uploads') );


//Sirve para escuchar el puerto
app.listen( process.env.PORT, () => {
    console.log('Servidor corriendo en puerto '+ process.env.PORT);
} )