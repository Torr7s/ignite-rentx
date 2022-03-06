import { inject, injectable } from 'tsyringe';

import { IUsersRepository } from '../../repositories/UsersInterface';

interface IUpdateUserAvatarRequest {
  user_id: string;
  avatar_file: string;
}

@injectable()
class UpdateUserAvatarUseCase {
  constructor(
    @inject('UsersRepository')
    private _usersRepository: IUsersRepository
  ) { }
  
  async perform({ user_id, avatar_file }: IUpdateUserAvatarRequest): Promise<void> { 
    const userData = await this._usersRepository.findById(user_id)

    userData.avatar = avatar_file

    await this._usersRepository.updateAvatar(user_id, avatar_file)
  }
}

export { UpdateUserAvatarUseCase }