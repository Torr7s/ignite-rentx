import { getRepository, Repository } from 'typeorm';
import { CarCategoryEntity } from '../../entities/CarCategoryEntity';

import { ICreateCarCategoryDto, ICarCategoriesRepository } from '../CarCategoriesInterface';

class CarCategoriesRepository implements ICarCategoriesRepository{
  private _categoryRepository: Repository<CarCategoryEntity>

  constructor() { 
    this._categoryRepository = getRepository(CarCategoryEntity)
  } 

  async create({ name, description }: ICreateCarCategoryDto): Promise<void> {
    const newCategoryData: CarCategoryEntity = this._categoryRepository.create({
      name,
      description
    })

    await this._categoryRepository.save(newCategoryData)
  }

  async list(): Promise<CarCategoryEntity[]> {
    const categoriesData: CarCategoryEntity[] = await this._categoryRepository.find()
    
    return categoriesData
  }

  async findByName(name: string): Promise<CarCategoryEntity> {
    const categoryData: CarCategoryEntity = await this._categoryRepository.findOne({ name })

    return categoryData
  }
}

export { CarCategoriesRepository }