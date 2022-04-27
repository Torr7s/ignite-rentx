import { inject, injectable } from 'tsyringe';

import { CarEntity } from '@modules/cars/infra/typeorm/entities/CarEntity';
import { RentalEntity } from '@modules/rentals/infra/typeorm/entities/RentalEntity';

import { ICarsRepository } from '@modules/cars/domain/repositories/CarsInterface';
import { IRentalsRepository } from '@modules/rentals/domain/repositories/RentalsInterface';

import { IDateProvider } from '@shared/container/providers/dateProvider/DateProviderInterface';

import { AppError } from '@shared/errors';

interface IDevolutionRequest {
  id: string;
  user_id: string;
}

@injectable()
class DevolutionRentalUseCase {
  constructor(
    @inject('CarsRepository')
    private _carsRepository: ICarsRepository,
    @inject('DayjsDateProvider')
    private _dateProvider: IDateProvider,
    @inject('RentalsRepository')
    private _rentalsrRepository: IRentalsRepository,
  ) { }

  async perform({ id, user_id }: IDevolutionRequest): Promise<RentalEntity> {
    const MINIMUM_DAILY_TIME_IN_DAYS: number = 1

    const rentalData: RentalEntity = await this._rentalsrRepository.findById(id)
    const carData: CarEntity = await this._carsRepository.findById(rentalData.car_id)

    if (!rentalData) throw new AppError('Rental does not exists!')

    const dateNow: Date = this._dateProvider.dateNow()

    let [dailyAmount, daysDelayed] = ([
      this._dateProvider.compareInDays(rentalData.expected_return_date, dateNow),
      this._dateProvider.compareInDays(dateNow, rentalData.expected_return_date)
    ])
    
    if (dailyAmount <= 0) dailyAmount = MINIMUM_DAILY_TIME_IN_DAYS
    
    let total: number = 0

    if (daysDelayed > 0) {
      const fineAmount = daysDelayed * carData.fine_amount
    
      total = fineAmount
    }
    
    total += dailyAmount * carData.daily_rate

    rentalData.end_date = this._dateProvider.dateNow()
    rentalData.total = total

    await this._rentalsrRepository.create(rentalData)
    await this._carsRepository.updateAvailability(carData.id, true)

    return rentalData
  }
}

export { DevolutionRentalUseCase }