import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import {Routes} from '@src/Routes';
import {specs, swaggerUi} from '@src/swagger';

const corsOptions = {
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

export class BootStrap {
  public express = express();

  constructor(private appRoutes: Routes) {
    this.express = express();
    this.middleware();
    this.setRoutes();
  }

  private middleware(): void {
    this.express.use(cors(corsOptions));
    this.express.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
    this.express.use(express.urlencoded({extended: true}));
    this.express.use(express.json());
    this.express.use('/webgl', express.static('WebGL'));
  }

  private setRoutes(): void {
    const router = express.Router();
    this.appRoutes.setRoutes(router);
    this.express.use('/api/v1', router);
  }
}