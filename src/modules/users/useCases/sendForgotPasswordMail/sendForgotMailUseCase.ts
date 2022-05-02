import { inject, injectable } from 'tsyringe';
import { v4 as uuid } from 'uuid';

import { IUsersRepository } from '@modules/users/domain/repositories/UsersInterface';
import { IUsersTokensRepository } from '@modules/users/domain/repositories/UsersTokensInterface';

import { AppError } from '@shared/errors';

import { IDateProvider } from '@shared/container/providers/dateProvider/DateProviderInterface';

@injectable()
class SendForgotMailUseCase {
  constructor(
    @inject('UsersRepository') 
    private _usersRepository: IUsersRepository,
    @inject('UsersTokensRepository')
    private _usersTokensRepository: IUsersTokensRepository,
    @inject('DayjsDateProvider')
    private _dateProvider: IDateProvider
  ) { }

  async perform(email: string) {
    const userData = await this._usersRepository.findByEmail(email)

    if (!userData) throw new AppError('User does not exists!')

    const token = uuid()

    const expiration_date = this._dateProvider.addHours(3)

    await this._usersTokensRepository.create({
      user_id: userData.id,
      refresh_token: token,
      expiration_date
    })
  }
}

export { SendForgotMailUseCase }