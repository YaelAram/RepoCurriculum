require( 'colors' );

const Books = require( '../provider/books_api' );
const { getData, listBooks, manageCart, ask } = require( '../model/inquirer' );
const createBooksMenuChoices = require( '../helpers/inquirer_menu' );
const createChoices = require( './cart_choices' );
const createTicket = require( './showTicket' );
const addToLibrary = require( '../db/buy_books' );
const getLibrary = require( '../db/library' );
const read = require( './read_book' );
const { createMessage, createTitle, createInfo } = require( '../helpers/chat' );

const apiBooks = new Books();

const search = async ( extras, result ) => {
    const booksSelected = [];
    if( !extras ) extras = await getData( createMessage( 'question', '¿Que libros deseas buscar?' ) );
    extras = extras.split( ',' );
    for( const book of extras ){
        const results = await apiBooks.searchBook( book );
        const id = await listBooks( createTitle( 'normal', 'Encontre los siguientes libros:' ), createBooksMenuChoices( results ) );
        booksSelected.push( results[ id ] );
    }
    return booksSelected;
};

const buy = async ( extras, result ) => {
    if( result === undefined ) result = [];
    let booksSelected = [];
    if( !extras && result.length === 0 ) booksSelected = await search( '', result );
    else if( !extras && result.length !== 0 ) booksSelected = [ ...result, ...( await search( '', result ) ) ];
    else if( extras && result.length === 0 ) booksSelected = await search( extras, result );
    else booksSelected = [ ...result, ...( await search( extras, result ) ) ];
    return booksSelected;
};

const cart = async ( extras, result ) => {
    const aux = [ ...result ];
    if( aux.length ){
        const states = await manageCart( createTitle( 'normal', 'Selecciona aquellos items que deseas remover:' ), createChoices( aux ) );
        const newCart = aux.filter( ( item, index ) => !( states.includes( index ) ) );
        return newCart;
    }
    else{
        console.log( createInfo( 'normal', 'Sin productos en la cesta' ) );
        return [];
    }
};

const end = async ( extras, result ) => {
    let aux = [ ...result ];
    if( result.length ){
        const confirm = await ask( createMessage( 'question', '¿Deseas ver tu carrito de compras antes de realizar la compra?' ) );
        if( confirm ) aux = await cart( '', aux );
        console.log( createInfo( 'normal', 'Aqui puedes encontrar el ticket de compra, disfruta de los libros' ) );
        createTicket( aux );
        const flag = await addToLibrary( aux );
        if( flag ) return [];
        else return result;
    }
    else{
        console.log( createInfo( 'normal', 'Sin productos en la cesta' ) );
        return [];
    }
};

const library = async ( extras, result ) => {
    const books = await getLibrary();
    if( !books.length ) console.log( createInfo( 'normal', 'Libreria vacia' ) );
    else{
        const id = await listBooks( createTitle( 'normal', 'Libreria:' ), createBooksMenuChoices( books ) );
        read( books[ id ] );
    }
    return [];
};

const help = ( extras, result ) => {
    console.log( createInfo( 'normal', 'Aqui hay algo que puede ayudarte:' ) );

    console.log( 'Visita nuestro sitio: https://github.com/YaelAram/ProyectoDiscretas' );

    console.log( `${ '+'.green } Los comandos ${ 'NO'.yellow } son sensibles a las mayusculas y minusculas` );
    
    console.log( `${ '+'.green } El comando ${ 'BUSCAR'.yellow } permite consultar la informacion de los libros que desees` );
    console.log( `  ${ '*'.cyan } Si solo escribes ${ 'BUSCAR'.yellow }, el sistema te preguntara posteriormente que libros buscar` );
    console.log( `  ${ '*'.cyan } Tambien puedes escribir los titulos junto al comando, sepando cada uno con una coma, puedes poner tantos como quieras` );
    console.log( `      ${ '-'.magenta } EJEMPLO ( 1 libro ): ${ 'buscar'.green } ${ 'el retorno del rey'.yellow }` );
    console.log( `      ${ '-'.magenta } EJEMPLO ( 2 lirbos ): ${ 'buscar'.green } ${ 'el caliz de fuego'.yellow }, ${ 'la orden del fenix'.yellow }` );
    
    console.log( `${ '+'.green } El comando ${ 'COMPRAR'.yellow } permite consultar la informacion de los libros que desees comprar y los añade a la cesta` );
    console.log( `  ${ '*'.cyan } Si solo escribes ${ 'COMPRAR'.yellow }, el sistema te preguntara posteriormente que libros buscar y comprar` );
    console.log( `  ${ '*'.cyan } Tambien puedes escribir los titulos junto al comando, sepando cada uno con una coma, puedes poner tantos como quieras` );
    console.log( `      ${ '-'.magenta } EJEMPLO ( 1 libro ): ${ 'comprar'.green } ${ 'el retorno del rey'.yellow }` );
    console.log( `      ${ '-'.magenta } EJEMPLO ( 2 lirbos ): ${ 'comprar'.green } ${ 'el caliz de fuego'.yellow }, ${ 'la orden del fenix'.yellow }` );
    
    console.log( `${ '+'.green } El comando ${ 'CARRITO'.yellow } permite consultar los libros que han sido añadidos a la cesta por el comando ${ 'COMPRAR'.yellow }` );

    console.log( `${ '+'.green } El comando ${ 'TERMINAR COMPRA'.yellow } permite generar un ticket de compra y agregar los libros de la cesta a la biblioteca personal` );

    console.log( `${ '+'.green } El comando ${ 'LIBRERIA'.yellow } permite abrir la libreria personal, ahi podremos seleccionar un libro y comenzar a leer` );
    return [];
};

const error = ( extras, result ) => {
    console.log( createInfo( 'error', 'Uppps!' ) );
    console.log( `${ '-'.red } Visita nuestro sitio: https://github.com/YaelAram/ProyectoDiscretas` );
    console.log( `${ '-'.red } Perdona no pude entenderte, no reconozco el comando ${ extras.red }` );
    console.log( `${ '-'.red } Puedes escribir ${ 'salir'.yellow } para salir` );
    console.log( `${ '-'.red } Puedes escribir ${ 'ayuda'.yellow } para obtener la descripcion de los comandos` );
    console.log( `${ '-'.red } Los comandos ${ 'NO'.yellow } son sensibles a las mayusculas o minusculas` );
    return [];
};

module.exports = {
    search,
    buy,
    cart,
    end,
    library,
    help,
    error
}
