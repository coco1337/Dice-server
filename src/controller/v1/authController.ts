import {inject, injectable} from 'inversify';
import {Request, Response, Router} from 'express';
import {authService} from '@src/service/authService';

@injectable()
export class authController {
  public route = "Auth"
  constructor(@inject('authService') private authService: authService) {
  }

  public setRoutes(router: Router) {
    /**
     * @swagger
     * /:
     *  post:
     *    description: auth
     *    response:
     *      200:
     *        description: auth
     */
    router.post(`/${this.route}/Login`, (req: Request, res: Response, next: Function) => {
      res.send('auth')
    });
  }
}