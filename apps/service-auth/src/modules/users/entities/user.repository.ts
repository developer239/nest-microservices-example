import { Injectable, InternalServerErrorException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { UserEntity } from 'src/modules/users/entities/user.entity'
import { UpdateProfileInput } from 'src/modules/users/inputs/update-profile.input'

@Injectable()
export class UserRepository {
  constructor(
    @InjectRepository(UserEntity)
    private readonly usersRepository: Repository<UserEntity>
  ) {}

  findAll() {
    return this.usersRepository.find()
  }

  findOneById(id: string) {
    return this.usersRepository.findOneBy({ id })
  }

  async checkUserExists(userId: string): Promise<boolean> {
    try {
      await this.usersRepository.findOneByOrFail({ id: userId })
      return true
    } catch (error) {
      if (error.name === 'EntityNotFound') {
        return false
      }
      throw new InternalServerErrorException('Database error')
    }
  }

  validateUserByFirebasePayload(decodedIdToken: {
    uid: string
    email: string
  }) {
    return this.usersRepository.findOneBy({
      email: decodedIdToken.email,
      uid: decodedIdToken.uid,
    })
  }

  createUserFromFirebasePayload(email: string, uid: string) {
    return this.usersRepository.save(
      this.usersRepository.create({
        email,
        uid,
      })
    )
  }

  async updateProfile(userId: string, updateData: UpdateProfileInput) {
    await this.usersRepository.update(userId, updateData)

    return this.usersRepository.findOneBy({ id: userId })
  }
}
