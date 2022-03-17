import { inject, injectable } from 'tsyringe';

import { IUsersRepository } from '@modules/users/repositories/UsersInterface';

import { deleteFile } from '@utils/file.util';

interface IUpdateUserAvatarRequest {
  user_id: string;
  avatar_file: string;
}

@injectable()
class UpdateUserAvatarUseCase {
  constructor(
    @inject('UsersRepository')
    private _repository: IUsersRepository
  ) { }

  async perform({ user_id, avatar_file }: IUpdateUserAvatarRequest): Promise<void> {
    const userData = await this._repository.findById(user_id)

    if (userData) await deleteFile(`./tmp/avatar/${userData.avatar}`)

    userData.avatar = avatar_file

    await this._repository.updateAvatar(user_id, avatar_file)
  }
}

export { UpdateUserAvatarUseCase }