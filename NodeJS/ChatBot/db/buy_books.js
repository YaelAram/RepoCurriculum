const mongoose = require( 'mongoose' );

const conectToDataBase = require( './config' );
const Sale = require( '../model/sale' );
const { createInfo } = require( '../helpers/chat' );

const addToLibrary = async ( books ) => {
    console.log( createInfo( 'normal', 'Agregando a tu biblioteca...' ) );
    try{
        await conectToDataBase();
        for( const book of books ){
            const sale = new Sale( book );
            await sale.save();
        }
        console.log( createInfo( 'normal', 'Los libros se han agregado con exito' ) );
        return true;
    }
    catch( error ){
        throw new Error( createInfo( 'error', 'Error al agregar a biblioteca' ) );
    }
    finally{
        await mongoose.connection.close();
    }
};

module.exports = addToLibrary;
