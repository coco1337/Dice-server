import express from 'express';
import {Routes} from '@src/routes/Routes';
import {specs, swaggerUi} from '@src/swagger/swagger';

export class BootStrap {
  public express = express();

  constructor(private appRoutes: Routes) {
    this.express = express();
    this.middleware();
    this.setRoutes();
  }

  private middleware(): void {
    this.express.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
    this.express.use(express.urlencoded({extended: true}));
    this.express.use(express.json());
  }

  private setRoutes(): void {
    const router = express.Router();

    router.get('/', (req, res) => {
      res.json({
        message: 'Ready!',
      });
    });

    this.appRoutes.setRoutes(router);
    this.express.use('/api/v1', router);
  }
}