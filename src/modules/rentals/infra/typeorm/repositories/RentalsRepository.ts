import { getRepository, Repository } from 'typeorm';

import { RentalEntity } from '../entities/RentalEntity';
import { IRentalsRepository } from '@modules/rentals/repositories/RentalsInterface';
import { ICreateRentalDto } from '@modules/rentals/dtos/CreateRentalDto';

class RentalsRepository implements IRentalsRepository {
  private _rentalsRepository: Repository<RentalEntity>
  
  constructor() {
    this._rentalsRepository = getRepository(RentalEntity)
  }

  async create({ user_id, car_id, expected_return_date }: ICreateRentalDto): Promise<RentalEntity> {
    const rentalData: RentalEntity = this._rentalsRepository.create({
      user_id,
      car_id,
      expected_return_date
    })

    await this._rentalsRepository.save(rentalData)

    return rentalData
  }

  async findRentalByCarId(car_id: string): Promise<RentalEntity> {
    const openRentalByCar: RentalEntity = await this._rentalsRepository.findOne({ car_id })

    return openRentalByCar
  }

  async findRentalByUserId(user_id: string): Promise<RentalEntity> {
    const openRentalByUser: RentalEntity = await this._rentalsRepository.findOne({ user_id })

    return openRentalByUser
  }
}

export { RentalsRepository }