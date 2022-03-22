import { SpecificationEntity } from '@modules/cars/infra/typeorm/entities/SpecificationEntity';

interface ICreateSpecificationEntity {
  name: string;
  description: string;
}

interface ISpecificationsRepository {
  create({ name, description }: ICreateSpecificationEntity): Promise<SpecificationEntity>;
  findByName(name: string): Promise<SpecificationEntity>;
  findByIds(ids: string[]): Promise<SpecificationEntity[]>;
}

export { ICreateSpecificationEntity, ISpecificationsRepository }