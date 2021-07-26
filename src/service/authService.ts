import {Request, Response} from "express";
import {injectable} from 'inversify';
import {
  Column,
  EntityManager,
  getManager,
  PrimaryGeneratedColumn, Repository,
} from 'typeorm';
import {T_Member} from '@src/entities/T_Member';

export interface IUser {
  id: number;
  userId: string;
  password: string;
  uuid: string;
  ip: string;
  joinDate: string;
  lastUpdate: string;
  lastLogin: string;
}

@injectable()
export class authService {
  private readonly authRepository: Repository<T_Member>;

  public constructor() {
    this.authRepository = getManager().getRepository(T_Member);
  }

  public async createUser(request: Request, response: Response) {
    const newUser = await this.authRepository.create(request.body);
    await this.authRepository.save(newUser);
    response.send(newUser);
  }
}