const searchAction = ( action = '' ) => {
    if( action.startsWith( 'buscar' ) ){
        action = action.replace( 'buscar', '' ).trim();
        return { action: 'search', extras: action };
    }
    else if( action.startsWith( 'comprar' ) ){
        action = action.replace( 'comprar', '' ).trim();
        return { action: 'buy', extras: action };
    }
    else if( action.startsWith( 'carrito' ) ) return { action: 'cart', extras: '' };
    else if( action.startsWith( 'terminar compra' ) ) return { action: 'end', extras: '' };
    else if( action.startsWith( 'libreria' ) ) return { action: 'library', extras: '' };
    else if( action.startsWith( 'ayuda' ) ) return { action: 'help', extras: '' };
    else return { action: 'error', extras: action };
};

module.exports = searchAction;
