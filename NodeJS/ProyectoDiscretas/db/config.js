const mongoose = require( 'mongoose' );

const conectToDataBase = async () => {
    try{ 
        await mongoose.connect( process.env.MongoDB_Atlas );
    }
    catch( error ){
        console.log( error );
    }
};

module.exports = conectToDataBase;
