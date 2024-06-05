import { Module } from '@nestjs/common'
import { EventService } from 'src/modules/events/services/event.service'
import { EventResolver } from 'src/modules/events/event.resolver'
import { TypeOrmModule } from '@nestjs/typeorm'
import { EventEntity } from 'src/modules/events/entities/event.entity'
import { EventAttendeeEntity } from 'src/modules/events/entities/attendee.entity'
import { EventRepository } from 'src/modules/events/entities/event.repository'
import { EventAttendeeRepository } from 'src/modules/events/entities/event-attendee.repository'
import { RabbitMQModule } from 'src/modules/amqb/amqb.module'
import { AMQPClientService } from 'src/modules/events/services/amqp-client'
import { EntityModelMapService } from 'src/modules/events/services/entity-model-map.service'

@Module({
  imports: [
    TypeOrmModule.forFeature([EventEntity, EventAttendeeEntity]),
    RabbitMQModule.forRoot(),
  ],
  providers: [
    EventResolver,
    EventService,
    EventRepository,
    EventAttendeeRepository,
    AMQPClientService,
    EntityModelMapService,
  ],
})
export class EventModule {}
