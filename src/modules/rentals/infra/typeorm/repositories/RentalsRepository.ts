import { getRepository, Repository } from 'typeorm';

import { RentalEntity } from '../entities/RentalEntity';
import { IRentalsRepository } from '@modules/rentals/domain/repositories/RentalsInterface';
import { ICreateRentalDto } from '@modules/rentals/domain/dtos/CreateRentalDto';

class RentalsRepository implements IRentalsRepository {
  private _rentalsRepository: Repository<RentalEntity>

  constructor() {
    this._rentalsRepository = getRepository(RentalEntity)
  }

  async create({ id, car_id, user_id, end_date, expected_return_date, total }: ICreateRentalDto): Promise<RentalEntity> {
    const rentalData: RentalEntity = this._rentalsRepository.create({
      id,
      car_id,
      user_id,
      end_date,
      expected_return_date,
      total
    })

    await this._rentalsRepository.save(rentalData)

    return rentalData
  }

  async findById(id: string): Promise<RentalEntity> {
    const rentalData: RentalEntity = await this._rentalsRepository.findOne(id)

    return rentalData
  }

  async findRentalByCarId(car_id: string): Promise<RentalEntity> {
    const openRentalByCar: RentalEntity = await this._rentalsRepository.findOne({
      where: {
        car_id,
        end_date: null
      }
    })

    return openRentalByCar
  }

  async findRentalByUserId(user_id: string): Promise<RentalEntity> {
    const openRentalByUser: RentalEntity = await this._rentalsRepository.findOne({
      where: {
        user_id,
        end_date: null
      }
    })

    return openRentalByUser
  }

  async findUserRentals(user_id: string): Promise<RentalEntity[]> {
    const rentalData = await this._rentalsRepository.find({ user_id })

    return rentalData
  }
}

export { RentalsRepository }