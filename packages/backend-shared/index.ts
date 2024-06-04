export {
  appConfigSchema,
  appConfig,
  AppConfigType,
} from './src/modules/config/app.config'
export { WrappedConfigModule } from './src/modules/config/config.module'
export { HomeModule } from './src/modules/home/home.module'
export { WrappedGraphQLModule } from './src/modules/gql/gql.module'
export { ApolloComplexityPlugin } from './src/modules/gql/apollo-complexity.plugin'
export { bootstrap } from './src/modules/main'