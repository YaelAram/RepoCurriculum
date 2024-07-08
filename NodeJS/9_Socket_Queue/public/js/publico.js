const lblTickets = [
    document.querySelector( '#lblTicket1' ),
    document.querySelector( '#lblTicket2' ),
    document.querySelector( '#lblTicket3' ),
    document.querySelector( '#lblTicket4' )
];
const lblEscritorios = [
    document.querySelector( '#lblEscritorio1' ),
    document.querySelector( '#lblEscritorio2' ),
    document.querySelector( '#lblEscritorio3' ),
    document.querySelector( '#lblEscritorio4' )
];

const socket = io();

socket.on( 'first-four-tickets', ( tickets = [] ) => {
    const audio = new Audio( './audio/new-ticket.mp3' );
    audio.play();
    tickets.forEach( ( ticket, index ) => {
        if( ticket ){
            lblTickets[ index ].innerText = `Ticket ${ ticket.number }`;
            lblEscritorios[ index ].innerText = ticket.desk;
        }
    } );
} );
