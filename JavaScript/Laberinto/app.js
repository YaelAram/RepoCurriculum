import { createLabyrinth, showLabyrinth, createConfig, dijkstra, createRandom } from "./helpers/index.js";

const main = () => {
    const config = createConfig( 5, 1, 5, 5, 6 );
    const labyrinth = createLabyrinth( config );
    const randomRoom = Object.keys( labyrinth ).at( createRandom( 1, Object.keys( labyrinth ).length - 1 ) );
    dijkstra( labyrinth, 'floor-0-A' );
    showLabyrinth( labyrinth );

    if( labyrinth[ randomRoom ][ 'camino' ] )
        console.log( `Camino entre el cuarto floor-0-A ( centro ) y el cuarto ${ randomRoom }: ${ labyrinth[ randomRoom ][ 'camino' ] }` );
    else console.log( `No existe un camino entre el cuarto floor-0-A ( centro ) y el cuarto ${ randomRoom }` );
};

main();
