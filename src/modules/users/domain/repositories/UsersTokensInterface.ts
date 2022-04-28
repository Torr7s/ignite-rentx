import { UserTokensEntity } from '@modules/users/infra/typeorm/entities/UserTokensEntity';
import { ICreateUserTokenDto } from '../dtos/CreateUserTokenDto';

interface IUsersTokensRepository {
  create(data: ICreateUserTokenDto): Promise<UserTokensEntity>
}

export { IUsersTokensRepository }