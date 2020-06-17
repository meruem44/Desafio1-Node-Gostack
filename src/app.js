import 'dotenv/config';

import express, { json } from 'express';
import cors from 'cors';
import mongoose from 'mongoose';

import routes from './routes';

class App {
    constructor() {
        this.server = express();

        this.middlewares();
        this.database();
        this.routes();
    };

    middlewares() {
        this.server.use(cors());
        this.server.use(json());
    };

    database() {
        mongoose.connect(`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@cluster0-uokh1.mongodb.net/modulo1?retryWrites=true&w=majority`,{
            useNewUrlParser: true,
            useUnifiedTopology:true
        });
    };

    routes() {
        this.server.use(routes);
    };
}

export default new App().server;