const express = require( 'express' );
const cors = require( 'cors' );

const socketController = require( '../socket/controller' );

class Server{
    constructor(){
        this.app = express();
        this.PORT = process.env.PORT;
        this.server = require( 'http' ).createServer( this.app );
        this.io = require( 'socket.io' )( this.server );

        // Routes Path
        this.userPath = '/api/user'

        // Middlewares
        this.middlewares();

        // Routes
        this.routes();

        // Socket Server
        this.socket();

        // Start Server
        this.listen()
    }

    middlewares(){
        // CORS
        this.app.use( cors() );

        // Body read ( get data for any request )
        this.app.use( express.json() );

        // Public Directory
        this.app.use( express.static( 'public' ) );
    }

    routes(){
        this.app.use( this.userPath, require( '../routes/user_routes' ) );
    }

    socket(){
        this.io.on( 'connection', socketController );
    }

    listen(){
        this.server.listen( this.PORT, () => console.log( `Listening at port ${ this.PORT }` ) );
    }
};

module.exports = Server;
