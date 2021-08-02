import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';

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
        entities: ["dist/**/*.entity{.ts,.js}"],
        synchronize: true,
        extra: {
          trustServerCertificate: true,
        },
      }),
      AuthModule,
      UsersModule,
      EventsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
