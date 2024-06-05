import { Module } from '@nestjs/common'
import {
  appConfig,
  appConfigSchema,
  WrappedConfigModule as BaseConfigModule,
} from 'backend-shared'
import { gatewayConfig, gatewayConfigSchema } from 'src/config/gateway.config'

@Module({
  imports: [
    BaseConfigModule.forRoot(
      ['.env'],
      [
        {
          values: appConfig,
          schema: appConfigSchema,
        },
        {
          values: gatewayConfig,
          schema: gatewayConfigSchema,
        },
      ]
    ),
  ],
})
export class ConfigModule {}
