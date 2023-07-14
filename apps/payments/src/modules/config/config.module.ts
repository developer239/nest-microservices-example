import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import * as Joi from 'joi'
import { appConfig, appConfigSchema } from '@shared/common/config/app.config'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig],
      envFilePath: ['apps/payments/.env'],
      validationSchema: Joi.object({
        ...appConfigSchema,
      }),
    }),
  ],
})
export class WrappedConfigModule {}
