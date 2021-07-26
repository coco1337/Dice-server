import {injectable} from 'inversify';
import {Router} from 'express';
import {authRoutes} from '@src/routes/authRoutes';

@injectable()
export class Routes {
  constructor(private authRoutes: authRoutes) {
  }

  public setRoutes(router: Router) {
    this.authRoutes.setRoutes(router);
  }
}