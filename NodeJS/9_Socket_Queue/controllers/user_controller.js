const { request, response } = require( 'express' );

/**
 * 
 * @param { request } req 
 * @param { response } res 
 */
const createUser = ( req, res) => {
    const { body } = req;
    res.status( 200 ).json( { message: 'Response API server', body } );
};

module.exports = createUser;
