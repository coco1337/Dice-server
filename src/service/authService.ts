import {injectable} from 'inversify';
import {getManager, Repository} from 'typeorm';
import {EncryptJWT} from 'jose/jwt/encrypt';
import {T_Member} from '@src/entities/T_Member';
import 'dotenv/config';
import {createPublicKey} from 'crypto';

@injectable()
export class authService {
  private readonly authRepository: Repository<T_Member>;

  public constructor() {
    this.authRepository = getManager().getRepository(T_Member);
  }

  public async getUser(username: string) {
    return getManager().getRepository(T_Member).find(
        {
          where: {userId: username},
          take: 1
        },
    );
  }

  public async CreateUser(username: string, password: string) {
    const newUser = this.authRepository.create();
    newUser.userId = username;
    newUser.password = password;
    await this.authRepository.save(newUser);
  }

  public async Login(username: string, password: string) {
    if (!username || !password) return false;
    const key = createPublicKey(process.env.JWTSecret!);
    const currentUser = await this.getUser(username);

    if (!currentUser) return false;
    if (currentUser[0].password !== password) return;

    return await new EncryptJWT(
        {'urn:example:claim': true}).
        setProtectedHeader({alg: 'dir', enc: 'A256GCM'}).
        setIssuedAt().
        setIssuer('urn:example:issuer').
        setAudience('urn:example:audience').
        setExpirationTime('20m').
        encrypt(key);
  }
}