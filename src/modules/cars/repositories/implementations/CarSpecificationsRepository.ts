import { getRepository, Repository } from 'typeorm';
import { CarSpecificationEntity } from '../../entities/CarSpecificationEntity';

import { ICreateCarSpecificationDto, ICarSpecificationsRepository } from '../CarSpecificationsInterface';

class CarSpecificationsRepository implements ICarSpecificationsRepository {
  private _specificationRepository: Repository<CarSpecificationEntity>
  
  constructor() { 
    this._specificationRepository = getRepository(CarSpecificationEntity)
  }

  async create({ name, description }: ICreateCarSpecificationDto): Promise<void> {
    const newSpecificationData: CarSpecificationEntity = this._specificationRepository.create({
      name,
      description
    })

    await this._specificationRepository.save(newSpecificationData)
  }

  async findByName(name: string): Promise<CarSpecificationEntity> {
    const specificationData: CarSpecificationEntity = await this._specificationRepository.findOne({ name })

    return specificationData
  }
}

export { CarSpecificationsRepository }