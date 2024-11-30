const createTicket = ( books ) => {
    const listFormat = new Intl.ListFormat( 'es-MX', { style: 'long', type: 'conjunction' } );
    const items = books.map( ( { title, authors }, index ) => {
        let names = ( !authors.length ) ? 'Autor Deconocido'.green : `${ listFormat.format( authors ) }`.green;
        return `${ `${ index + 1 }.`.yellow } ${ title } ( ${ names } )`.padEnd( 120, ' ' );
    } );
    for( const item of items ) console.log( `\n${ item } -> $100.00` );
    console.log( `${ ''.padEnd( 120, '_' ) }` );
    console.log( `${ 'Total'.padEnd( 100, ' ' ) } -> $${ items.length * 100 }.00\n` );
};

module.exports = createTicket;
