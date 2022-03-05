import { UserEntity } from '../entities/UserEntity';

import { ICreateUserDto } from '../dtos/CreateUserDto';

interface IUsersRepository {
  create(data: ICreateUserDto): Promise<void>;
  findByEmail(email: string): Promise<UserEntity>;
  findById(id: string): Promise<UserEntity>;
}

export { IUsersRepository }