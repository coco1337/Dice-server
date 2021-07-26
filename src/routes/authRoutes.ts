import {inject, injectable} from 'inversify';
import {Router} from 'express';
import {authService} from '@src/service/authService';

@injectable()
export class authRoutes {

  constructor(@inject('authService') private authService: authService) {
  }

  public setRoutes(router: Router) {
    router.get('/', () => {

    });
  }
}