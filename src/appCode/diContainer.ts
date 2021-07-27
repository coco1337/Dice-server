import {Container} from 'inversify';
import {Routes} from '@src/Routes';
import {authController} from '@src/controller/v1/authController';
import {authService} from '@src/service/authService';

export class DiContainer {
  public readonly diContainer: Container;

  constructor() {
    this.diContainer = new Container();
    this.configure();
  }

  public configure() {

    this.configureRepositories();
    this.diContainer.bind<Routes>(Routes).toSelf().inSingletonScope();
    this.diContainer.bind<authController>(authController).toSelf().inSingletonScope();

  }

  private configureRepositories() {
    this.diContainer.bind<authService>('authService').to(authService).inTransientScope();
  }
}