import { KEY_DOORS, KEY_FLOORS, KEY_WALLS } from "./createConfig.js";

const letter = 65;
const labyrinth = {};

const createOut = () => labyrinth[ 'floor-out' ] = { inf: 0, sup: 360 };

/**
 * 
 * @param { string } keyNewRoom 
 * @param { number } inf 
 * @param { number } sup
 */
const createLimit = ( keyNewRoom, inf = 0, sup = 360 ) => labyrinth[ keyNewRoom ] = { inf, sup };

/**
 * 
 * @param { Array } walls 
 * @param { string } key
 */
const createLimits = ( walls, key ) => {
    if( !walls.length || walls.length === 1 ) return createLimit( `${ key }-${ String.fromCharCode( letter ) }` );
    walls.forEach( ( value, index ) => {
        const keyNewRoom = `${ key }-${ String.fromCharCode( letter + index ) }`;
        const supLimit = walls.at( index + 1 ) ?? walls.at( 0 );
        createLimit( keyNewRoom, value, supLimit );
    } );
};

/**
 * 
 * @param { string } floor 
 * @returns { Function }
 */
const predicate = ( floor, door ) => {
    return ( [ key, { inf, sup } ] ) => {
        if( inf < sup ) return key.startsWith( floor ) && door >= inf && door <= sup;
        else return key.startsWith( floor ) && ( door >= inf || door <= sup );
    }
};

/**
 * 
 * @param { Array } doors 
 * @param { string } currentFloor 
 * @param { Map } config
 */
const createConnections = ( doors, currentFloor, config ) => {
    let nextFloor = `floor-${ Number.parseInt( currentFloor.at( -1 ) ) + 1 }`;
    if( !config.get( KEY_FLOORS ).get( nextFloor ) ) nextFloor = 'floor-out';
    const exitsAux = new Set();

    for( const door of doors ){
        const [ roomCurrentFloor ] = Object.entries( labyrinth ).filter( predicate( currentFloor, door ) ).flat();
        const [ roomNextFloor ] = Object.entries( labyrinth ).filter( predicate( nextFloor, door ) ).flat();
        if( roomCurrentFloor && roomNextFloor ) exitsAux.add( `${ roomCurrentFloor }*${ roomNextFloor }` );
    }

    exitsAux.forEach( ( exit ) => {
        const [ roomCurrentFloor, roomNextFloor ] = exit.split( '*' );
        if( !labyrinth[ roomCurrentFloor ][ 'exits' ] ) labyrinth[ roomCurrentFloor ][ 'exits' ] = {};
        if( !labyrinth[ roomNextFloor ][ 'exits' ] ) labyrinth[ roomNextFloor ][ 'exits' ] = {};
        labyrinth[ roomCurrentFloor ][ 'exits' ][ roomNextFloor ] = 1;
        labyrinth[ roomNextFloor ][ 'exits' ][ roomCurrentFloor ] = 1;
    } );
};

/**
 * 
 * @param { Map } labyrinth 
 */
export const showLabyrinth = ( labyrinth ) => {
    console.log( labyrinth );
};

const cleanLabyrinth = () => {
    for( const key in labyrinth ) {
        delete labyrinth[ key ][ 'inf' ];
        delete labyrinth[ key ][ 'sup' ];
    }
};


/**
 * 
 * @param { Map } config 
 * @returns { Object }
 */
export const createLabyrinth = ( config ) =>{
    config.get( KEY_FLOORS ).forEach( ( value, key ) => createLimits( value.get( KEY_WALLS ), key ) );
    createOut();
    config.get( KEY_FLOORS ).forEach( ( value, key ) => createConnections( value.get( KEY_DOORS ), key, config ) );
    cleanLabyrinth();

    return labyrinth;
};
