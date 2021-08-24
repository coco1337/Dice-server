import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { EventsModule } from './events/events.module';
import { LogsModule } from './logs/logs.module';
import { DiceCoreService } from './dice-core/dice-core.service';
import { LoggerOptions } from 'typeorm';
import { DiceCoreModule } from './dice-core/dice-core.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'mssql',
      host: process.env.DBHost,
      port: 1433,
      username: process.env.DBUser,
      password: process.env.DBPass,
      database: process.env.DBName,
      entities: ['dist/**/entities/*.entity{.ts,.js}'],
      synchronize: true,
      extra: {
        trustServerCertificate: true,
      },
      logging: 'all', //https://typeorm.io/#/logging
    }),
    AuthModule,
    UsersModule,
    LogsModule,
    DiceCoreModule,
    EventsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
