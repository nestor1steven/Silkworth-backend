//importacion del paquete
const mongoose = require('mongoose');

const dbConnection = async() => {
    

    try {
        //await: espera a que toda la instruccion se ejecute
        await mongoose.connect( process.env.DB_CNN, {
            useNewUrlParser: true, 
            useUnifiedTopology: true, 
            useCreateIndex: true
        });

        console.log('DB Online')
        
    } catch (error) {
        console.log('Error: '+error);
        throw new Error('Error a la hora de iniciar la DB ver logs'); 
    }


    
}

module.exports = {
    dbConnection
}