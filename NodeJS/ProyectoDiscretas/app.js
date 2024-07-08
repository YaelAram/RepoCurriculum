require( 'dotenv' ).config();

const { getData } = require( './model/inquirer' );
const analyzer = require( './helpers/analyzer' );
const actions = require( './helpers/actions' );
const { createMessage, createInfo } = require( './helpers/chat' );

const main = async () => {
    console.clear();
    let answer = '', result = [];
    console.log( createInfo( 'normal', 'Bienvenido a BookLand' ) );
    while( true ){
        answer = await getData( createMessage( 'question', '¿En que puedo ayudarte?' ) );
        answer = answer.toLowerCase().trim();
        if( answer !== 'salir' ){
            const { action, extras } = analyzer( answer );
            const aux = await actions[ action ]( extras, result );
            if( [ 'buy', 'cart', 'end' ].includes( action ) ) result = aux;
        }
        else{
            console.log( createInfo( 'sad', 'Adios, vuelve pronto' ) );
            break;
        }
    }
};

main();
