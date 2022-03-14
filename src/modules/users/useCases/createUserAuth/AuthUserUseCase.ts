import { compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';

import { inject, injectable } from 'tsyringe';

import { UserEntity } from '@modules/users/infra/typeorm/entities/UserEntity';

import { IUsersRepository } from '@modules/users/repositories/UsersInterface';

import { AppError } from '@shared/errors/app.error';

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
}

@injectable()
class AuthUserUseCase {
  constructor(
    @inject('UsersRepository')
    private _usersRepository: IUsersRepository
  ) { }

  async perform({ email, password }: IAuthUserRequest): Promise<IAuthUserResponse> {
    const userData: UserEntity = await this._usersRepository.findByEmail(email)

    if (!userData) {
      throw new AppError(
        'Invalid credentials!',
          401
      )
    }

    const validPassword = await compare(password, userData.password)

    if (!validPassword) {
      throw new AppError(
        'Invalid credentials!',
          401
      )
    }

    const token = sign({}, `${process.env.MD5_HASH}`, {
      subject: userData.id,
      expiresIn: '1d'
    })

    const tokenData: IAuthUserResponse = {
      token,
      userData: {
        name: userData.name,
        email: userData.password
      }
    }

    return tokenData
  }
}

export { IAuthUserResponse, AuthUserUseCase }