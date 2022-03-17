import { AppError } from '@shared/errors';

import { CreateUserUseCase } from '@modules/users/useCases/createUser/CreateUserUseCase'

import { AuthUserUseCase, IAuthUserResponse } from '@modules/users/useCases/createUserAuth/AuthUserUseCase'
import { UsersRepositoryInMemory } from '@modules/users/repositories/in-memory/UsersRepositoryInMemory'
import { ICreateUserDto } from '@modules/users/dtos/CreateUserDto'

let usersRepositoryInMemory: UsersRepositoryInMemory
let authUserUseCase: AuthUserUseCase
let createUserUseCase: CreateUserUseCase

describe('Authenticate user', () => {
  beforeAll(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory()
    authUserUseCase = new AuthUserUseCase(
      usersRepositoryInMemory
    )
    createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory)
  })

  it('should be able to authenticate an user', async () => {
    const userData: ICreateUserDto = {
      name: 'User 1',
      email: 'usertest@gmail.com',
      password: 'test123',
      driver_license: '000123',
    }

    await createUserUseCase.perform(userData)

    const authResult: IAuthUserResponse = await authUserUseCase.perform({
      email: userData.email,
      password: userData.password
    })

    expect(authResult).toHaveProperty('token')
  })

  it('should not be able to authenticate an non-existent user', async () => {
    expect(async () => {
      await authUserUseCase.perform({
        email: 'fake@gmail.com',
        password: '1234'
      })
    })
      .rejects
      .toBeInstanceOf(AppError)
  })

  it('should not be able to authenticate an user with incorret password', async () => {
    expect(async () => {
      const userData: ICreateUserDto = {
        name: 'User 2',
        email: 'usertest2@gmail.com',
        password: 'test1234',
        driver_license: '09999',
      }

      await createUserUseCase.perform(userData)

      await authUserUseCase.perform({
        email: userData.email,
        password: 'incorrect_password'
      })
    })
      .rejects
      .toBeInstanceOf(AppError)
  })
})