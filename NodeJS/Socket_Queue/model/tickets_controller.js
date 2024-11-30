const fs = require( 'fs' );
const path = require('path');

const DATA_ROUTE = '../data/data.json';

class Ticket{
    constructor( number, desk ) {
        this.number = number;
        this.desk = desk;
    }

    get toString() {
        return `Ticket ${ this.number }`;
    }
}

class TicketController{
    constructor() {
        this.lastNumber = 0;
        this.day = new Date().getDate();
        this.tickets = [];
        this.firstFourTickets = [];
        this.init();
    }

    get toJSON() {
        return {
            lastNumber: this.lastNumber,
            day: this.day,
            tickets: this.tickets,
            firstFourTickets: this.firstFourTickets
        };
    }

    saveData() {
        const pathData = path.join( __dirname, DATA_ROUTE );
        fs.writeFileSync( pathData, JSON.stringify( this.toJSON ) );
    }

    init() {
        const { lastNumber, day, tickets, firstFourTickets } = require( DATA_ROUTE );
        if( this.day === day ){
            this.lastNumber = lastNumber;
            this.tickets = tickets;
            this.firstFourTickets = firstFourTickets;
        }
        else this.saveData();
    }

    createTicket() {
        this.lastNumber += 1;
        const ticket = new Ticket( this.lastNumber, null );
        this.tickets.push( ticket );
        this.saveData();
        return ticket.toString;
    }

    serveTicket( desk ) {
        if( !this.tickets.length ) return null;
        const ticket = this.tickets.shift();
        ticket.desk = desk;
        this.firstFourTickets.unshift( ticket );
        if( this.firstFourTickets.length > 4 ) this.firstFourTickets.pop();
        this.saveData();
        return ticket;
    }
}

module.exports = TicketController;
