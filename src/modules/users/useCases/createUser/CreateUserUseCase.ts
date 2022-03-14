import { inject, injectable } from 'tsyringe';

import { hash } from 'bcrypt';

import { UserEntity } from '@modules/users/infra/typeorm/entities/UserEntity';
import { ICreateUserDto } from '@modules/users/dtos/CreateUserDto';
import { IUsersRepository } from '@modules/users/repositories/UsersInterface';

import { AppError } from '@shared/errors/app.error';

@injectable()
class CreateUserUseCase {
  constructor(
    @inject('UsersRepository')
    private _usersRepository: IUsersRepository
  ) { }

  async perform({
    name,
    email,
    password,
    driver_license
  }: ICreateUserDto): Promise<void> {
    const userData: UserEntity = await this._usersRepository.findByEmail(email)
  
    if (userData) {
      throw new AppError(
        'User already exists!'
      )
    }
    
    const hashedPassword = await hash(password, 8)

    await this._usersRepository.create({
      name,
      email,
      password: hashedPassword,
      driver_license
    })
  }
}

export { CreateUserUseCase }