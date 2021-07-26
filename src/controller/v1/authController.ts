import { inject } from 'inversify';
import { Request, response } from 'express';

export class authController {
  constructor() {

  }

  public Alive() {
    return 'success';
  }

  public async Login(username: string, password: string) {

  }
}