const jwt = require('jsonwebtoken');

const generarJWT = ( uid ) => {

    return new Promise(( resolve, reaject ) => {
      
        const payload = {
            uid
        };
    
        //firma de jsonwebtoken
        jwt.sign( payload, process.env.JWT_SECRET, {
            expiresIn: '12h'
        }, (err, token) => {
            if (  err ) {
                console.log(err);
                reaject('no se pudo generar el jwt');
            } else {
                resolve( token );
            }


        }); 
        

    });

}

module.exports = {
    generarJWT
}