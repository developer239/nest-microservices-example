import { Module } from '@nestjs/common'
import { ClientsModule, Transport } from '@nestjs/microservices'
import { appConfig, AppConfigType } from 'nest-helpers'
import { AMQP_SERVICE_AUTH } from 'src/constants'
import { ConfigModule } from 'src/modules/config/config.module'

@Module({})
export class RabbitMQModule {
  static forRoot() {
    return {
      module: RabbitMQModule,
      imports: [
        ClientsModule.registerAsync([
          {
            name: AMQP_SERVICE_AUTH,
            imports: [ConfigModule],
            inject: [appConfig.KEY],
            useFactory: (config: AppConfigType) => ({
              transport: Transport.RMQ,
              options: {
                urls: [`amqp://${config.amqpHost}:${config.amqpPort}`],
                queue: config.amqpHost,
                queueOptions: {
                  durable: false,
                },
              },
            }),
          },
        ]),
      ],
      exports: [ClientsModule],
    }
  }
}
