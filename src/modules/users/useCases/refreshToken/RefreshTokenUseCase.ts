import { inject, injectable } from 'tsyringe';

import { sign, verify } from 'jsonwebtoken';

import { IUsersTokensRepository } from '@modules/users/domain/repositories/UsersTokensInterface';

import { AppError } from '@shared/errors';

import { IDateProvider } from '@shared/container/providers/dateProvider/DateProviderInterface';

interface IPayload {
  email: string;
  sub: string;
}

@injectable()
class RefreshTokenUseCase {
  constructor(
    @inject('UsersTokensRepository')
    private _repository: IUsersTokensRepository,
    @inject('DayjsDateProvider')
    private _dateProvider: IDateProvider
  ) { }

  async perform(token: string): Promise<string> {
    const { REFRESH_TOKEN_HASH } = process.env

    const { email, sub } = verify(token, REFRESH_TOKEN_HASH) as IPayload

    const userToken = await this._repository.findByUserIdAndRefreshToken(sub, token)

    if (!userToken) throw new AppError('Refresh Token does not exists!')

    await this._repository.deleteById(userToken.id)

    const refresh_token = sign({ email }, REFRESH_TOKEN_HASH, {
      subject: sub,
      expiresIn: '30d'
    })

    const expiration_date = this._dateProvider.addDays(30)

    await this._repository.create({
      user_id: sub,
      refresh_token,
      expiration_date
    })

    return refresh_token
  }
}

export { RefreshTokenUseCase }