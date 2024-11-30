const TicketController = require( '../model/tickets_controller' );

const ticketController = new TicketController();

const socketController = ( socket ) => {
    socket.emit( 'last-ticket', ticketController.lastNumber );
    socket.emit( 'first-four-tickets', ticketController.firstFourTickets );
    socket.emit( 'pending-tickets', ticketController.tickets.length );
    socket.on( 'create-ticket', ( payload, callback ) => {
        const ticket = ticketController.createTicket();
        socket.broadcast.emit( 'pending-tickets', ticketController.tickets.length );
        callback( ticket );
    } );
    socket.on( 'serve-ticket', ( { desk }, callback ) => {
        if( !desk ) return callback( { ok: false, message: 'Campo escritorio es requerido', ticket: null, length: null } );
        const ticket = ticketController.serveTicket( desk );
        if( !ticket ) callback( { ok: false, message: 'No hay mas tickets por atender', ticket: null, length: 0 } );
        else{
            socket.broadcast.emit( 'first-four-tickets', ticketController.firstFourTickets );
            socket.broadcast.emit( 'pending-tickets', ticketController.tickets.length );
            callback( { ok: true, message: '', ticket, length: ticketController.tickets.length } );
        }
    } );
};

module.exports = socketController;
