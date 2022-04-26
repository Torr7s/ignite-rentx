import { SpecificationEntity } from '@modules/cars/infra/typeorm/entities/SpecificationEntity';
import { ICreateSpecificationEntity, ISpecificationsRepository } from '../SpecificationsInterface';

class SpecificationsRepositoryInMemory implements ISpecificationsRepository {
  private specifications: SpecificationEntity[] = []

  async create({ name, description }: ICreateSpecificationEntity): Promise<SpecificationEntity> {
    const newSpecificationData = new SpecificationEntity()

    Object.assign(newSpecificationData, {
      name,
      description
    })

    this.specifications.push(newSpecificationData)

    return newSpecificationData
  }

  async findByName(name: string): Promise<SpecificationEntity> {
    return this.specifications.find((spec) => spec.name === name)
  }

  async findByIds(ids: string[]): Promise<SpecificationEntity[]> {
    const allSpecifications = this.specifications.filter((spec) => {
      return ids.includes(spec.id)
    })

    return allSpecifications
  }
}

export { SpecificationsRepositoryInMemory }