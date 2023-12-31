import { Logger, VersioningType } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { Transport } from '@nestjs/microservices'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { useContainer } from 'class-validator'
import { AppModule } from '@app/payments/app.module'
import { appConfig, AppConfigType } from '@shared/common/config/app.config'

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true })
  useContainer(app.select(AppModule), { fallbackOnErrors: true })

  const appConfigValues = app.get<AppConfigType>(appConfig.KEY)

  app.connectMicroservice({
    transport: Transport.TCP,
    options: {
      host: '0.0.0.0',
      port: appConfigValues.tcpPort,
    },
  })

  app.enableShutdownHooks()
  app.setGlobalPrefix(appConfigValues.apiPrefix, {
    exclude: ['/'],
  })
  app.enableVersioning({
    type: VersioningType.URI,
  })

  const options = new DocumentBuilder()
    .setTitle('API')
    .setDescription(`${appConfigValues.name} Docs`)
    .setVersion('1.0')
    .addBearerAuth()
    .build()

  const document = SwaggerModule.createDocument(app, options)
  SwaggerModule.setup('docs', app, document)

  await app.startAllMicroservices()

  await app.listen(appConfigValues.httPort)
  Logger.log(`[NestApplication] Running on port: ${appConfigValues.httPort}`)
  Logger.log(
    `[NestApplication] Docs running on: ${appConfigValues.httPort}/docs`
  )
}

void bootstrap()
