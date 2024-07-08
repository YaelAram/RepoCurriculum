import { createRandom } from './createRandom.js';
import { range } from './range.js';

export const KEY_NUMBER_DOORS = 'numberDoors';
export const KEY_NUMBER_FLOORS = 'numberFloors';
export const KEY_NUMBER_WALLS = 'numberWalls';
export const KEY_DOORS = 'doors';
export const KEY_FLOORS = 'floors';
export const KEY_WALLS = 'walls';

const config = new Map();

/**
 * 
 * @param { number } numberWalls 
 * @returns { Array }
 */
const createWalls = ( numberWalls ) => {
    const walls = [];
    for( let i = 0 ; i < numberWalls ; i++ ) walls.push( createRandom( 0, 360 ) );

    return walls.sort( ( a, b ) => a - b );
};

/**
 * @param { Array } walls
 * @param { number } numberDoors 
 * @returns { Array }
 */
const createDoors = ( walls = [], numberDoors ) => {
    const doors = [];
    while( doors.length !== numberDoors ){
        const door = createRandom( 0, 360 );
        if( !walls.includes( door ) ) doors.push( door );
    }

    return doors.sort( ( a, b ) => a - b );
};

/**
 * 
 * @param { Map } configShow 
 */
export const showConfig = ( configShow ) => {
    console.log( `Number of Floors: ${ configShow.get( KEY_NUMBER_FLOORS ) }` );
    configShow.get( KEY_FLOORS ).forEach( ( value, key ) => {
        console.log( `\nFloor: ${ key }` );
        console.log( value );
    } );
};

const createFloors = () => {
    for( const index of range( config.get( KEY_NUMBER_FLOORS ) ) ) 
        config.get( KEY_FLOORS ).set( `floor-${ index }`, new Map() );
};

/**
 * 
 * @param { number } minNumWalls 
 * @param { number } maxNumWalls 
 * @param { number } minNumDoors 
 * @param { number } maxNumDoors 
 */
const createWallsConfig = ( minNumWalls = 0, maxNumWalls = 5, minNumDoors = 0, maxNumDoors = 5 ) => {
    config.get( KEY_FLOORS ).forEach( ( value, key ) => { 
        if( key !== 'floor-0' ) value.set( KEY_NUMBER_WALLS, createRandom( minNumWalls, maxNumWalls ) ); 
        else value.set( KEY_NUMBER_WALLS, 0 ); /** Floor-0 doesn't need walls */
        value.set( KEY_WALLS, createWalls( value.get( KEY_NUMBER_WALLS ) ) ); /** Sorted array of walls every wall is a number from 0 to 360 */
        value.set( KEY_NUMBER_DOORS, createRandom( minNumDoors, maxNumDoors ) );
    } );
};

const createDoorsConfig = () => {
    config.get( KEY_FLOORS ).forEach( ( value, key ) => { 
        const nextFloor = config.get( KEY_FLOORS ).get( `floor-${ Number.parseInt( key.split( '-' ).pop() ) + 1 }` );
        const nextFloorWalls = ( nextFloor ) ? nextFloor.get( KEY_WALLS ) : [];
        const currentFloorWalls = value.get( KEY_WALLS );
        const walls = [ ...currentFloorWalls, ...nextFloorWalls ];
        value.set( KEY_DOORS, createDoors( walls, value.get( KEY_NUMBER_DOORS ) ) );
    } );
};

/**
 * 
 * @param { number } maxNumFloors 
 * @param { number } minNumWalls 
 * @param { number } maxNumWalls 
 * @param { number } minNumDoors 
 * @param { number } maxNumDoors 
 * @returns { Map }
 */
export const createConfig = ( maxNumFloors = 5, minNumWalls = 0, maxNumWalls = 5, minNumDoors = 0, maxNumDoors = 5 ) => {
    /** Define how many floors will have the labyrinth and a new map that will contain each floor configuration */
    config.set( KEY_NUMBER_FLOORS, createRandom( 2, maxNumFloors ) );
    config.set( KEY_FLOORS, new Map() );

    /** Creates a new Map for each floor, from floor-0 (center) to floor-n */
    createFloors();

    /** For each floor configuration, creates how many walls and doors it will have and the array of walls */
    createWallsConfig( minNumWalls, maxNumWalls, minNumDoors, maxNumDoors );

    /** Creates the array of doors, it checks that a door doesn't collide with a wall from the current or the next floor */
    createDoorsConfig();

    return config;
};
