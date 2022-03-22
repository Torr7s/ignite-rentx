import { inject, injectable } from 'tsyringe';

import { CarEntity } from '@modules/cars/infra/typeorm/entities/CarEntity';
import { SpecificationEntity } from '@modules/cars/infra/typeorm/entities/SpecificationEntity';

import { ICarsRepository } from '@modules/cars/repositories/CarsInterface';
import { ISpecificationsRepository } from '@modules/cars/repositories/SpecificationsInterface';

import { AppError } from '@shared/errors';

interface ICreateCarSpecificationRequest {
  car_id: string;
  specifications_id: string[];
}

@injectable()
class CreateCarSpecificationUseCase {
  constructor(
    @inject('CarsRepository')
    private _repository: ICarsRepository,

    @inject('SpecificationsRepository')
    private _specificationsRepository: ISpecificationsRepository
  ) { }

  async perform({ car_id, specifications_id }: ICreateCarSpecificationRequest): Promise<CarEntity> {
    const carData: CarEntity = await this._repository.findById(car_id)
    
    if (!carData) throw new AppError('Car does not exists!')

    const specificationsData: SpecificationEntity[] = await this._specificationsRepository.findByIds(specifications_id)

    carData.specifications = specificationsData

    await this._repository.create(carData)

    return carData
  }
}

export { CreateCarSpecificationUseCase }