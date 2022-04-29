import { compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';

import { inject, injectable } from 'tsyringe';

import { UserEntity } from '@modules/users/infra/typeorm/entities/UserEntity';

import { IUsersRepository } from '@modules/users/domain/repositories/UsersInterface';
import { IUsersTokensRepository } from '@modules/users/domain/repositories/UsersTokensInterface';

import { AppError } from '@shared/errors';

import { IDateProvider } from '@shared/container/providers/dateProvider/DateProviderInterface';

interface IAuthUserRequest {
  email: string;
  password: string;
}

interface IAuthUserResponse {
  userData: {
    name: string,
    email: string
  },
  token: string;
  refresh_token: string;
}

@injectable()
class AuthUserUseCase {
  constructor(
    @inject('UsersRepository')
    private _usersRepository: IUsersRepository,
    @inject('UsersTokensRepository')
    private _usersTokensRepository: IUsersTokensRepository,
    @inject('DayjsDateProvider')
    private _dateProvider: IDateProvider
  ) { }

  async perform({ email, password }: IAuthUserRequest): Promise<IAuthUserResponse> {
    const userData: UserEntity = await this._usersRepository.findByEmail(email)

    if (!userData) throw new AppError('Invalid credentials!', 401)

    const validPassword = await compare(password, userData.password)

    if (!validPassword) throw new AppError('Invalid credentials!', 401)

    const { MD5_HASH, REFRESH_TOKEN_HASH } = process.env

    const token = sign({}, MD5_HASH, {
      subject: userData.id,
      expiresIn: '1d'
    })

    const refresh_token = sign({ email }, REFRESH_TOKEN_HASH, {
      subject: userData.id,
      expiresIn: '30d'
    })

    const expiration_date = this._dateProvider.addDays(30)

    await this._usersTokensRepository.create({
      user_id: userData.id,
      refresh_token,
      expiration_date
    })

    const tokenData: IAuthUserResponse = {
      token,
      userData: {
        name: userData.name,
        email: userData.email
      },
      refresh_token
    }

    return tokenData
  }
}

export { IAuthUserResponse, AuthUserUseCase }