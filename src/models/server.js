const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../database/config');

class Server {
    constructor() {
        this.app = express();
        this.PORT = process.env.PORT;
        this.usuariosPath = '/api/usuarios';

        // Conectar a la DB
        this.conectarDB();   

        // Middlewares
        this.middlewares();

        // Rutas de mi aplicacion
        this.routes();
    }

    async conectarDB() {
        await dbConnection();
    }

    middlewares() {

        // Cors
        this.app.use( cors() );

        // Parseo y lectura del body
        this.app.use( express.json() );

        // Directorio Publico
        this.app.use( express.static('public') );
    }

    routes() {
        this.app.use(this.usuariosPath, require('../routes/user'));
    }

    listen(){
        this.app.listen(this.PORT, () => {
            console.log('Server on Port 🖥', this.PORT);
        });
    }
}

module.exports = Server;