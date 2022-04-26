import { UserEntity } from '@modules/users/infra/typeorm/entities/UserEntity';
import { ICreateUserDto } from '@modules/users/domain/dtos/CreateUserDto';
import { IUsersRepository } from '@modules/users/domain/repositories/UsersInterface';

class UsersRepositoryInMemory implements IUsersRepository {
  private users: UserEntity[] = []

  async create({ name, email, password, driver_license }: ICreateUserDto): Promise<void> {
    const newUserData: UserEntity = new UserEntity()

    Object.assign(newUserData, {
      name,
      email,
      password,
      driver_license
    })

    this.users.push(newUserData)
  }

  async findByEmail(email: string): Promise<UserEntity> {
    const userData: UserEntity = this.users.find((user) => user.email === email)

    return userData
  }

  async findById(id: string): Promise<UserEntity> {
    const userData: UserEntity = this.users.find((user) => user.id === id)

    return userData
  }

  async updateAvatar(id: string, avatar_file: string): Promise<UserEntity> {
    const userData = this.findById(id)

    userData['avatar'] = avatar_file

    return userData
  }
}

export { UsersRepositoryInMemory }