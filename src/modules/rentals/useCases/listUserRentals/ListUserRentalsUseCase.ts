import { inject, injectable } from 'tsyringe';

import { RentalEntity } from '@modules/rentals/infra/typeorm/entities/RentalEntity';

import { IRentalsRepository } from '@modules/rentals/domain/repositories/RentalsInterface';

import { AppError } from '@shared/errors';

@injectable()
class ListUserRentalsUseCase {
  constructor(
    @inject('RentalsRepository') private _repository: IRentalsRepository
  ) { }

  async perform(id: string): Promise<RentalEntity[]> {
    const userRentalsData = await this._repository.findUserRentals(id)

    if (!userRentalsData) throw new AppError('No rentals has been found for this user!')

    return userRentalsData
  }
}

export { ListUserRentalsUseCase }