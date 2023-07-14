import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { RefreshTokenEntity } from '@app/auth/modules/auth/entities/refresh-token.entity'

@Injectable()
export class RefreshTokenRepository {
  constructor(
    @InjectRepository(RefreshTokenEntity)
    private readonly refreshTokenRepository: Repository<RefreshTokenEntity>
  ) {}

  async addRefreshToken(userId: number, value: string, ipAddress: string) {
    const refreshToken = this.refreshTokenRepository.create({
      value,
      ipAddress,
      user: { id: userId },
    })

    await this.refreshTokenRepository.save(refreshToken)
  }

  findRefreshTokenByValue(value: string) {
    return this.refreshTokenRepository.findOne({
      where: {
        value,
      },
      relations: ['user'],
    })
  }
}
