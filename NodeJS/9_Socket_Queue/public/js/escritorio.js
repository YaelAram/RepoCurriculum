const client = document.querySelector( 'small' );
const nextClientButton = document.querySelector( 'button' );
const labelInfo = document.querySelector( 'span' );
const lblPendientes = document.querySelector( '#lblPendientes' );

const socket = io();
const searchParams = new URLSearchParams( window.location.search );

if( !searchParams.has( 'escritorio' ) ){
    window.location = 'index.html';
    throw new Error( 'Parametro escritorio es obligatorio' );
}
const desk = searchParams.get( 'escritorio' );
document.querySelector( '#titulo' ).innerText = desk;

socket.on( 'connect', () => nextClientButton.disabled = false );
socket.on( 'disconnect', () => nextClientButton.disabled = true );

socket.on( 'pending-tickets', ( pendingTickets ) => {
    lblPendientes.innerText = pendingTickets;
} );

nextClientButton.addEventListener( 'click', () => {
    socket.emit( 'serve-ticket', { desk }, ( { ok, message, ticket, length } ) => {
        if( !ok ) labelInfo.innerText = message;
        else{
            client.innerText = `TICKET ${ ticket.number }`;
            lblPendientes.innerText = length;
        }
    } );
} );
