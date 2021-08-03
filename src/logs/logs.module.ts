import { Module } from '@nestjs/common';
import { LogsService } from './logs.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoginLog } from './entities/login-log.entity';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([LoginLog]),
    UsersModule,
  ],
  providers: [LogsService],
  exports: [LogsService],
})
export class LogsModule {}
