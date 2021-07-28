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
     * /Login:
     *  post:
     *    description: Login
     *    tags: [Auth]
     *    requestBody:
     *      required: true
     *      content:
     *        application/json:
     *          schema:
     *            $ref: '#components/schemas/Login'
     *    response:
     *      200:
     *        description: auth Token
     *        scheme:
     *          type: object
     *          $ref: '#/definitions/Login'
     */
    router.post(`/${this.route}/Login`, async (req: Request, res: Response, next: Function) => {
      await this.authService.Login(req.body.userId, req.body.password)
      res.send('auth')
    });
  }
}