import { getRepository, Repository } from 'typeorm';

import { CarSpecificationEntity } from '@modules/cars/infra/typeorm/entities/CarSpecificationEntity';
import { ICreateCarSpecificationDto, ICarSpecificationsRepository } from '@modules/cars/repositories/CarSpecificationsInterface';

class CarSpecificationsRepository implements ICarSpecificationsRepository {
  private _specificationsRepository: Repository<CarSpecificationEntity>
  
  constructor() { 
    this._specificationsRepository = getRepository(CarSpecificationEntity)
  }

  async create({ name, description }: ICreateCarSpecificationDto): Promise<void> {
    const newSpecificationData: CarSpecificationEntity = this._specificationsRepository.create({
      name,
      description
    })

    await this._specificationsRepository.save(newSpecificationData)
  }

  async findByName(name: string): Promise<CarSpecificationEntity> {
    const specificationData: CarSpecificationEntity = await this._specificationsRepository.findOne({ name })

    return specificationData
  }
}

export { CarSpecificationsRepository }