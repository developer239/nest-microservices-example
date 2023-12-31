import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  Logger,
} from '@nestjs/common'
import { ClientProxy } from '@nestjs/microservices'
import { catchError, map, Observable, tap } from 'rxjs'
import {
  AUTH_SESSION_AUTHENTICATE_PATTERN,
  IAuthSessionAuthenticateResult,
} from '@shared/common/modules/auth/strategies/auth-service-jwt.strategy.types'
import { AUTH_SERVICE_TOKEN } from '@shared/common/tokens'

@Injectable()
export class AuthServiceJwtStrategy implements CanActivate {
  constructor(
    @Inject(AUTH_SERVICE_TOKEN) private readonly authClient: ClientProxy
  ) {}

  canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    const bearerToken = context
      .switchToHttp()
      .getRequest()
      .headers.authorization?.split(' ')[1]

    if (!bearerToken) {
      return false
    }

    return this.authClient
      .send<IAuthSessionAuthenticateResult>(AUTH_SESSION_AUTHENTICATE_PATTERN, {
        token: bearerToken,
      })
      .pipe(
        tap((user) => {
          context.switchToHttp().getRequest().user = user
        }),
        map(() => true),
        catchError((error) => {
          Logger.error('[auth-service-jwt.strategy] An error occurred:', error)
          throw error
        })
      )
  }
}
