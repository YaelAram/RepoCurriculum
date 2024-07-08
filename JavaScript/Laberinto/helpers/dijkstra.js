const nodosPorVisitar = [];

/**
 * 
 * @param { string } nodo 
 */
const agregarNodoPorVisitar = ( nodo ) => {
    if( !nodosPorVisitar.includes( nodo ) ) nodosPorVisitar.push( nodo );
};

/**
 * 
 * @param { Object } grafo
 * @param { string } nodo 
 * @param { string } nodoInicial
 */
const visitarNodo = ( grafo, nodo, nodoInicial ) => {
    const nodoActual = grafo[ nodo ];
    nodoActual[ 'visitado' ] = true;
    for( const salida in nodoActual[ 'exits' ] ){
        if( salida !== nodoInicial ){
            const siguienteNodo = grafo[ salida ];
            const costoAcumulado = nodoActual[ 'exits' ][ salida ] + nodoActual[ 'costo' ];
            if( !siguienteNodo[ 'visitado' ] ) agregarNodoPorVisitar( salida );
            if( siguienteNodo[ 'costo' ] === 0 || siguienteNodo[ 'costo' ] > costoAcumulado ){
                siguienteNodo[ 'costo' ] = costoAcumulado;
                const caminoAcumulado = ( nodo === nodoInicial ) ? nodoInicial : nodoActual[ 'camino' ];
                siguienteNodo[ 'camino' ] = caminoAcumulado.concat( ` -> ${ salida }` );
            }
        }
    }
};

/**
 * 
 * @param { Object } grafo 
 */
const ajustarGrafo = ( grafo ) => {
    for( const nodo in grafo ) {
        grafo[ nodo ][ 'visitado' ] = false;
        grafo[ nodo ][ 'camino' ] = '';
        grafo[ nodo ][ 'costo' ] = 0;
    }
};

/**
 * 
 * @param { Object } grafo 
 * @param { string } nodoInicial 
 */
export const dijkstra = ( grafo, nodoInicial ) => {
    ajustarGrafo( grafo );
    nodosPorVisitar.push( nodoInicial );
    while( nodosPorVisitar.length ){
        const nodo = nodosPorVisitar.shift();
        visitarNodo( grafo, nodo, nodoInicial );
    }
};
