const label = document.querySelector( '#lblNuevoTicket' );
const button = document.querySelector( 'button' );

const socket = io();

socket.on( 'connect', () => button.disabled = false );
socket.on( 'last-ticket', ( lastNumber ) => label.innerText = `Ticket ${ lastNumber }` );
socket.on( 'disconnect', () => button.disabled = true );

button.addEventListener( 'click', () => {
    socket.emit( 'create-ticket', null, ( ticket ) => label.innerText = ticket );
} );
