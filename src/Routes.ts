import {injectable} from 'inversify';
import {Router} from 'express';
import {authController} from '@src/controller/v1/authController';

@injectable()
export class Routes {
  constructor(private authRoutes: authController) {
  }

  public setRoutes(router: Router) {
    this.authRoutes.setRoutes(router);
  }
}