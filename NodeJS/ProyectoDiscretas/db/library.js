const mongoose = require( 'mongoose' );

const conectToDataBase = require( './config' );
const Sale = require( '../model/sale' );
const { createInfo } = require( '../helpers/chat' );

const getLibrary = async () => {
    console.log( createInfo( 'normal', 'Abriendo biblioteca...' ) );
    try{
        await conectToDataBase();
        let books = await Sale.find( {}, 'title authors description -_id' ).exec();
        books = books.map( ( sale ) => Object.values( sale )[ 2 ] );
        return books;
    }
    catch( error ){
        throw new Error( createInfo( 'error', 'Error al abrir biblioteca' ) );
    }
    finally{
        await mongoose.connection.close();
    }
};

module.exports = getLibrary;
