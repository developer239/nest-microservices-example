import {
  ClassSerializerInterceptor,
  Module,
  ValidationPipe,
} from '@nestjs/common'
import { APP_FILTER, APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core'
import { AuthModule } from '@app/auth/modules/auth/auth.module'
import { WrappedConfigModule } from '@app/auth/modules/config/config.module'
import { WrappedDatabaseModule } from '@app/auth/modules/database/database.module'
import { HomeModule } from '@shared/common/modules/home/home.module'
import { LoggerModule } from '@shared/common/modules/logger/logger.module'
import { HttpExceptionFilter } from '@shared/common/utils/filters/http-exception.filter'
import { validationOptions } from '@shared/common/utils/validation-options'

@Module({
  imports: [
    WrappedConfigModule,
    WrappedDatabaseModule,
    HomeModule,
    LoggerModule,
    AuthModule,
  ],
  providers: [
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe(validationOptions),
    },
    {
      provide: APP_FILTER,
      useValue: HttpExceptionFilter,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: ClassSerializerInterceptor,
    },
  ],
})
export class AppModule {}
