import { injectable, inject } from 'tsyringe';

import { ICarsRepository } from '@modules/cars/repositories/CarsInterface';
import { CarEntity } from '@modules/cars/infra/typeorm/entities/CarEntity';

import { AppError } from '@shared/errors';

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
    private _repository: ICarsRepository
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
    const carData: CarEntity = await this._repository.findByLicensePlate(license_plate)
  
    if (carData) {
      throw new AppError('Car already exists!')
    }

    const newCarData: CarEntity = await this._repository.create({
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