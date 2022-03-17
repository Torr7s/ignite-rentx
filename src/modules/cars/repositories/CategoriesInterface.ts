import { CategoryEntity } from '@modules/cars/infra/typeorm/entities/CategoryEntity';

/**
 * DTO - Data Transfer Object
 * 
 * Usefull to create an object which will be responsable to transfer data between classes.
 * From now on, everytime that we want to create an object and receive it from a router, 
 * the DTO concept will be used. 
*/
interface ICreateCategoryDto {
  name: string;
  description: string;
}

interface ICategoriesRepository {
  create({ name, description }: ICreateCategoryDto): Promise<void>;
  list(): Promise<CategoryEntity[]>;
  findByName(name: string): Promise<CategoryEntity>;
}

export { ICreateCategoryDto, ICategoriesRepository }