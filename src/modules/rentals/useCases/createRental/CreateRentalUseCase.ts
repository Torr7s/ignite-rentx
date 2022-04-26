import { inject, injectable } from 'tsyringe';

import { RentalEntity } from '@modules/rentals/infra/typeorm/entities/RentalEntity';

import { IRentalsRepository } from '@modules/rentals/domain/repositories/RentalsInterface';
import { ICarsRepository } from '@modules/cars/domain/repositories/CarsInterface';

import { IDateProvider } from '@shared/container/providers/dateProvider/DateProviderInterface';

import { AppError } from '@shared/errors';

interface ICreateRentalRequest {
  user_id: string;
  car_id: string;
  expected_return_date: Date;
}

@injectable()
class CreateRentalUseCase {
  constructor(
    @inject('RentalsRepository') 
    private _rentalsRepository: IRentalsRepository,
    @inject('DayjsDateProvider') 
    private _dateProvider: IDateProvider,
    @inject('CarsRepository') 
    private _carsRepository: ICarsRepository
  ) { }

  async perform({ user_id, car_id, expected_return_date }: ICreateRentalRequest): Promise<RentalEntity> {
    const MINIMUM_RENTAL_HOURS_DURATION = 24

    const [carUnavailable, rentalOpenToUser] = await Promise.all([
      this._rentalsRepository.findRentalByCarId(car_id),
      this._rentalsRepository.findRentalByUserId(user_id)
    ])

    if (carUnavailable) throw new AppError('Car unavailable for rental!')
    
    if (rentalOpenToUser) throw new AppError('Rental already open for this user!')

    const dateNow = this._dateProvider.dateNow()

    const comparedDates = this._dateProvider.compareInHours(
      dateNow, 
      expected_return_date
    )

    if (comparedDates < MINIMUM_RENTAL_HOURS_DURATION) {
      throw new AppError('Invalid return time!')
    }
    
    const rentalData = await this._rentalsRepository.create({
      user_id,
      car_id,
      expected_return_date
    })

    await this._carsRepository.updateAvailability(car_id, false)

    return rentalData
  }
}

export { CreateRentalUseCase }