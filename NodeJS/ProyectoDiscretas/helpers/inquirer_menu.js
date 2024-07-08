require( 'colors' );

const createBooksMenuChoices = ( books = [] ) => {
    const listFormat = new Intl.ListFormat( 'es-MX', { style: 'long', type: 'conjunction' } );
    return books.map( ( { title, authors }, index ) => {
        let names = ( !authors.length ) ? 'Autor Deconocido'.green : `${ listFormat.format( authors ) }`.green;
        return { 
            value: ( index ),
            name: `${ `${ index + 1 }.`.yellow } ${ title } ( ${ names } )`
        }
    } );
};

module.exports = createBooksMenuChoices;
