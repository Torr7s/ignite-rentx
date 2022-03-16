import { getRepository, Repository } from 'typeorm';

import { CarEntity } from '../entities/CarEntity';
import { ICreateCarDto } from '@modules/cars/dtos/CreateCarDto';
import { ICarsRepository } from '@modules/cars/repositories/CarsInterface';

class CarsRepository implements ICarsRepository {
  private _carsRepository: Repository<CarEntity>

  constructor() {
    this._carsRepository = getRepository(CarEntity)
  }

  async create({
    name,
    description,
    daily_rate,
    license_plate,
    fine_amount,
    brand,
    category_id
  }: ICreateCarDto): Promise<CarEntity> {
    const newCarData: CarEntity = this._carsRepository.create({
      name,
      description,
      daily_rate,
      license_plate,
      fine_amount,
      brand,
      category_id
    })

    await this._carsRepository.save(newCarData)

    return newCarData
  }

  async findByLicensePlate(license_plate: string): Promise<CarEntity> {
    const carData: CarEntity = await this._carsRepository.findOne({ license_plate })

    return carData
  }

  async findAvailableCars(
    name?: string,
    brand?: string,
    category_id?: string
  ): Promise<CarEntity[]> {
    const availableCarsQuery = await this._carsRepository
      .createQueryBuilder('cars')
      .where('available = :available', {
        available: true
      })

    if (name) {
      availableCarsQuery
        .andWhere('cars.name = :name', {
          name
        })
    }

    if (brand) {
      availableCarsQuery
        .andWhere('cars.brand = :brand', {
          brand
        })
    }

    if (category_id) {
      availableCarsQuery
        .andWhere('cars.category_id = :category_id', {
          category_id
        })
    }

    const availableCarsData: CarEntity[] = await availableCarsQuery.getMany()

    return availableCarsData
  }
}

export { CarsRepository }