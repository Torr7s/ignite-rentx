import { getRepository, Repository } from 'typeorm';

import { UserTokensEntity } from '../entities/UserTokensEntity';
import { IUsersTokensRepository } from '@modules/users/domain/repositories/UsersTokensInterface';
import { ICreateUserTokenDto } from '@modules/users/domain/dtos/CreateUserTokenDto';

class UsersTokensRepository implements IUsersTokensRepository {
  private _usersTokensRepository: Repository<UserTokensEntity>

  constructor() {
    this._usersTokensRepository = getRepository(UserTokensEntity)
  }

  async create({ user_id, expiration_date, refresh_token }: ICreateUserTokenDto): Promise<UserTokensEntity> {
    const newUserTokenData: UserTokensEntity = this._usersTokensRepository.create({
      user_id,
      expiration_date,
      refresh_token
    })

    await this._usersTokensRepository.save(newUserTokenData)

    return newUserTokenData
  }
}

export { UsersTokensRepository }