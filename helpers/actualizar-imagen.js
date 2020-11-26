//filesystem: leer carpetas y archivos y trabajar con eso
const fs = require('fs');
const Interno = require("../models/interno");
const Usuario = require("../models/usuario");
const Producto = require("../models/producto");


const borrarImagen = ( path ) => {

    if( fs.existsSync( path )) {
        //Borrar la imagen anterior
        fs.unlinkSync( path );
    }

}


const actualizarImagen = async ( tipo, id, nombreArchivo) => {

    let pathViejo = "";

    switch ( tipo ) {
        case 'usuarios':
                
                const usuario = await Usuario.findById(id);
                if( !usuario ) {
                    console.log('no es un usuario por id')
                    return false;
                }

                pathViejo = `./uploads/usuarios/${ usuario.img }`;
                borrarImagen( pathViejo );
                

                usuario.img = nombreArchivo;
                await usuario.save();
                return true;

            break;
        case 'internos':

                const interno = await Interno.findById(id);
                if( !interno ) {
                    console.log('no es un interno por id')
                    return false;
                }

                pathViejo = `./uploads/internos/${ interno.img }`;
                borrarImagen( pathViejo );
                

                interno.img = nombreArchivo;
                await interno.save();
                return true;

            break;
        case 'productos':
            
            const producto = await Producto.findById(id);
            if( !producto ) {
                console.log('no es un producto por id')
                return false;
            }

            pathViejo = `./uploads/productos/${ producto.img }`;
            borrarImagen( pathViejo );
            

            producto.img = nombreArchivo;
            await producto.save();
            return true;

            break;
    
        default:
            break;
    }
}

module.exports = {
    actualizarImagen
}