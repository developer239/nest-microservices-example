import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import * as Joi from 'joi'
import { authConfig, authConfigSchema } from '@app/auth/config/auth.config'
import {
  databaseConfig,
  databaseConfigSchema,
} from '@app/auth/config/database.config'
import { appConfig, appConfigSchema } from '@shared/common/config/app.config'

@Module({})
export class WrappedConfigModule {
  static forRoot() {
    return {
      module: WrappedConfigModule,
      imports: [
        ConfigModule.forRoot({
          isGlobal: true,
          load: [appConfig, authConfig, databaseConfig],
          envFilePath: ['apps/auth/.env'],
          validationSchema: Joi.object({
            ...appConfigSchema,
            ...authConfigSchema,
            ...databaseConfigSchema,
          }),
        }),
      ],
    }
  }
}
