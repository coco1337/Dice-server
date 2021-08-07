import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategies/jwt.strategy';
import { ConfigModule } from '@nestjs/config';
import { LogsModule } from '../logs/logs.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    JwtModule.register({
      secret: process.env.JWTSecret,
      signOptions: {expiresIn: '5m'},
    }),
    PassportModule,
    UsersModule,
    LogsModule
  ],
  providers: [AuthService, JwtStrategy], // auth Strategy 여기서 추가
  exports: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
