import { Module } from '@nestjs/common';
import { EventsGateway } from './events.gateway';
import { DiceCoreModule } from '../dice-core/dice-core.module';

@Module({
  imports: [
    DiceCoreModule,
  ],
  providers: [EventsGateway],
})
export class EventsModule {}
