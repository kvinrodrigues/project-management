const express = require('express');
const cors = require('cors');

const { dbConnection } = require('../database/config');

class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT || 3000;

        this.usuariosPath = '/api/usuarios';
        this.authPath = '/api/auth';
        this.proyectosPath = '/api/proyectos';
        this.permisosPath = '/api/permisos';
        this.rolesPath = '/api/roles';
        this.storiesPath = '/api/stories';
        this.backlogPath = '/api/backlogs';

        // Conectar a base de datos
        this.conectarDB();

        // Middlewares
        this.middlewares();

        // Rutas de mi aplicación
        this.routes();
    }

    async conectarDB() {
        await dbConnection();
    }


    middlewares() {

        // CORS
        this.app.use(cors());

        // Lectura y parseo del body
        this.app.use(express.json());

        // Directorio Público
        this.app.use(express.static('public'));

    }

    routes() {
        this.app.use(this.authPath, require('../routes/auth'));
        this.app.use(this.usuariosPath, require('../routes/usuarios'));
        this.app.use(this.proyectosPath, require('../routes/proyectos'));
        this.app.use(this.permisosPath, require('../routes/permisos'));
        this.app.use(this.rolesPath, require('../routes/roles'));
        this.app.use(this.storiesPath, require('../routes/userstories'));
        this.app.use(this.backlogPath, require('../routes/backlogs'));
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('Servidor corriendo en puerto', this.port);
        });
    }

}


module.exports = Server;