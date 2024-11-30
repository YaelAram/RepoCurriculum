const axios = require( 'axios' );

class Books {
    constructor(){ }

    async searchBook( q = '' ){
        try{
            const instance = axios.create( {
                'baseURL': `https://www.googleapis.com/books/v1/volumes`,
                'params': {
                    q,
                    'maxResults': 4
                }
            } );
            const resp = ( await instance.get() ).data.items;
            return resp.map( ( { volumeInfo } ) => {
                const title = volumeInfo.title ?? 'Titulo Desconocido';
                const authors = volumeInfo.authors ?? [];
                const description = volumeInfo.description ?? 'Sin Descripcion';
                return {
                    title,
                    authors,
                    description
                }
            } );
        }
        catch( error ){
            return [];
        }
    }
};

module.exports = Books;
