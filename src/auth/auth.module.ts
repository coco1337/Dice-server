import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategies/jwt.strategy';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    UsersModule,
    PassportModule,
    JwtModule.register({
      secret: process.env.JWTSecret,
      signOptions: {expiresIn: '5m'},
    }),
  ],
  providers: [AuthService, JwtStrategy], // auth Strategy 여기서 추가
  exports: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
