import { getRepository, Repository } from 'typeorm';
import { CarCategoryEntity } from '../../entities/CarCategoryEntity';

import { ICreateCarCategoryDto, ICarCategoriesRepository } from '../CarCategoriesInterface';

class CarCategoriesRepository implements ICarCategoriesRepository{
  private _categoriesRepository: Repository<CarCategoryEntity>

  constructor() { 
    this._categoriesRepository = getRepository(CarCategoryEntity)
  } 

  async create({ name, description }: ICreateCarCategoryDto): Promise<void> {
    const newCategoryData: CarCategoryEntity = this._categoriesRepository.create({
      name,
      description
    })

    await this._categoriesRepository.save(newCategoryData)
  }

  async list(): Promise<CarCategoryEntity[]> {
    const categoriesData: CarCategoryEntity[] = await this._categoriesRepository.find()
    
    return categoriesData
  }

  async findByName(name: string): Promise<CarCategoryEntity> {
    const categoryData: CarCategoryEntity = await this._categoriesRepository.findOne({ name })

    return categoryData
  }
}

export { CarCategoriesRepository }