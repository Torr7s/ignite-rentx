import { CarSpecificationModel } from '../models/CarSpecificationModel';

interface ICreateCarSpecificationDto {
  name: string;
  description: string;
}

interface ICarSpecificationsRepository {
  create({ name, description }: ICreateCarSpecificationDto);
  findByName(name: string): CarSpecificationModel;
}

export { ICreateCarSpecificationDto, ICarSpecificationsRepository }