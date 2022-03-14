import { UserEntity } from '@modules/users/infra/typeorm/entities/UserEntity';
import { ICreateUserDto } from '@modules/users/dtos/CreateUserDto';

interface IUsersRepository {
  create(data: ICreateUserDto): Promise<void>;
  findByEmail(email: string): Promise<UserEntity>;
  findById(id: string): Promise<UserEntity>;
  updateAvatar(id: string, avatar_file: string): Promise<UserEntity>
}

export { IUsersRepository }