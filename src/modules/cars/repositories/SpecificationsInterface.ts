import { SpecificationEntity } from '@modules/cars/infra/typeorm/entities/SpecificationEntity';

interface ICreateSpecificationEntity {
  name: string;
  description: string;
}

interface ISpecificationsRepository {
  create({ name, description }: ICreateSpecificationEntity): Promise<void>;
  findByName(name: string): Promise<SpecificationEntity>;
}

export { ICreateSpecificationEntity, ISpecificationsRepository }