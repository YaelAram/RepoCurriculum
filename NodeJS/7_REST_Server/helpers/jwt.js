const jwt = require( 'jsonwebtoken' );

const createJWT = ( uid = '' ) => {
    return new Promise( ( resolve, reject ) => {
        const payload = { uid };
        jwt.sign( payload, process.env.SECRETORPRIVATEKEY, {
            expiresIn: '4h'
        }, ( error, token ) => {
            if( error ){
                console.log( error );
                reject( 'JWT was not created' );
            }
            else resolve( token );
        } );
    } );
};

module.exports = createJWT;
