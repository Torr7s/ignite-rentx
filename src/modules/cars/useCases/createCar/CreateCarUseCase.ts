import { injectable, inject } from 'tsyringe';

import { AppError } from '@shared/errors/app.error';

import { ICarsRepository } from '@modules/cars/repositories/CarsInterface';
import { CarEntity } from '@modules/cars/infra/typeorm/entities/CarEntity';

interface ICreateCarRequest {
  name: string;
  description: string;
  daily_rate: number;
  license_plate: string;
  fine_amount: number;
  brand: string;
  category_id: string
}

@injectable()
class CreateCarUseCase {
  constructor(
    @inject('CarsRepository')
    private _carsRepository: ICarsRepository
  ) { }
  async perform({
    name,
    description,
    daily_rate,
    license_plate,
    fine_amount,
    brand,
    category_id
  }: ICreateCarRequest): Promise<CarEntity> {
    const carExists: CarEntity = await this._carsRepository.findByLicensePlate(license_plate)
  
    if (carExists) {
      throw new AppError('Car already exists!')
    }

    const newCarData: CarEntity = await this._carsRepository.create({
      name,
      description,
      daily_rate,
      license_plate,
      fine_amount,
      brand,
      category_id
    }) 

    return newCarData
  }
}

export { ICreateCarRequest, CreateCarUseCase }