import { inject, injectable } from 'tsyringe';

import { RentalEntity } from '@modules/rentals/infra/typeorm/entities/RentalEntity';
import { IRentalsRepository } from '@modules/rentals/repositories/RentalsInterface';

import { IDateProvider } from '@shared/container/providers/dateProvider/DateProviderInterface';

import { AppError } from '@shared/errors';

interface ICreateRentalRequest {
  user_id: string;
  car_id: string;
  expected_return_date: Date;
}

@injectable()
class CreateRentalUseCase {
  private MINIMUM_RENTAL_HOURS_DURATION: number = 24

  constructor(
    @inject('RentalsRepository')
    private _repository: IRentalsRepository,

    @inject('DayjsDateProvider')
    private dateProvider: IDateProvider
  ) { }

  async perform({ user_id, car_id, expected_return_date }: ICreateRentalRequest): Promise<RentalEntity> {
    const carUnavailable = await this._repository.findRentalByCarId(car_id)

    if (carUnavailable) throw new AppError('Car unavailable for rental!')

    const rentalOpenToUser = await this._repository.findRentalByUserId(user_id)

    if (rentalOpenToUser) throw new AppError('Rental already open for this user!')

    const dateNow = this.dateProvider.dateNow()

    const compare = this.dateProvider.compareInHours(dateNow, expected_return_date)
    
    if (compare < this.MINIMUM_RENTAL_HOURS_DURATION) {
      throw new AppError('Invalid return time!')
    } 

    const rentalData = await this._repository.create({
      user_id,
      car_id,
      expected_return_date
    })

    return rentalData
  }
}

export { CreateRentalUseCase }