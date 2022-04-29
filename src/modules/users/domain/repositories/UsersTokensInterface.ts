import { UserTokensEntity } from '@modules/users/infra/typeorm/entities/UserTokensEntity';
import { ICreateUserTokenDto } from '../dtos/CreateUserTokenDto';

interface IUsersTokensRepository {
  create(data: ICreateUserTokenDto): Promise<UserTokensEntity>;
  deleteById(id: string): Promise<void>;
  findByUserIdAndRefreshToken(user_id: string, refresh_token: string): Promise<UserTokensEntity>;
}

export { IUsersTokensRepository }