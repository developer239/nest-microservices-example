import { Module } from '@nestjs/common'
import { HomeModule } from 'backend-shared'
import { WrappedConfigModule } from 'src/modules/config/config.module'
import { GraphQLModule } from '@nestjs/graphql'
import { EventModule } from 'src/modules/events/events.module'
import {
  ApolloFederationDriver,
  ApolloFederationDriverConfig,
} from '@nestjs/apollo'
import { ApolloServerPluginInlineTrace } from '@apollo/server/plugin/inlineTrace'

@Module({
  imports: [
    WrappedConfigModule,
    HomeModule,
    GraphQLModule.forRoot<ApolloFederationDriverConfig>({
      driver: ApolloFederationDriver,
      playground: true,
      autoSchemaFile: true,
      introspection: true,
      plugins: [ApolloServerPluginInlineTrace()],
      // buildSchemaOptions: {
      //   orphanedTypes: [User],
      // },
    }),
    EventModule,
  ],
})
export class AppModule {}
