import express, {Application} from 'express';
import {swaggerUi, specs} from './swagger/swagger';

import {createServer, Server} from 'http';

import 'dotenv/config';

const app: Application = express();
const port = process.env.host!.split(':')[1];

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

const server: Server = createServer(app);

server.listen(port);