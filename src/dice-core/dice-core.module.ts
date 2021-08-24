import { Module } from '@nestjs/common';
import { DiceCoreService } from './dice-core.service';

@Module({
  exports: [DiceCoreService],
  providers: [DiceCoreService],
})
export class DiceCoreModule {}
