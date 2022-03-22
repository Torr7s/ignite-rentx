import { getRepository, Repository } from 'typeorm';

import { SpecificationEntity } from '@modules/cars/infra/typeorm/entities/SpecificationEntity';
import { ISpecificationsRepository, ICreateSpecificationEntity } from '@modules/cars/repositories/SpecificationsInterface';

class SpecificationsRepository implements ISpecificationsRepository {
  private _specificationsRepository: Repository<SpecificationEntity>
  
  constructor() { 
    this._specificationsRepository = getRepository(SpecificationEntity)
  }

  async create({ name, description }: ICreateSpecificationEntity): Promise<SpecificationEntity> {
    const newSpecificationData: SpecificationEntity = this._specificationsRepository.create({
      name,
      description
    })

    await this._specificationsRepository.save(newSpecificationData)

    return newSpecificationData
  }

  async findByName(name: string): Promise<SpecificationEntity> {
    const specificationData: SpecificationEntity = await this._specificationsRepository.findOne({ name })

    return specificationData
  }

  async findByIds(ids: string[]): Promise<SpecificationEntity[]> {
    const specificationsData: SpecificationEntity[] = await this._specificationsRepository.findByIds(ids)

    return specificationsData
  }
}

export { SpecificationsRepository }