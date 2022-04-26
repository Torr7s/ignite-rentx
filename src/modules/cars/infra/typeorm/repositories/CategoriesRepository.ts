import { getRepository, Repository } from 'typeorm';

import { CategoryEntity } from '@modules/cars/infra/typeorm/entities/CategoryEntity';
import { ICategoriesRepository, ICreateCategoryDto } from '@modules/cars/domain/repositories/CategoriesInterface';

class CategoriesRepository implements ICategoriesRepository{
  private _categoriesRepository: Repository<CategoryEntity>

  constructor() { 
    this._categoriesRepository = getRepository(CategoryEntity)
  } 

  async create({ name, description }: ICreateCategoryDto): Promise<void> {
    const newCategoryData: CategoryEntity = this._categoriesRepository.create({
      name,
      description
    })

    await this._categoriesRepository.save(newCategoryData)
  }

  async list(): Promise<CategoryEntity[]> {
    const categoriesData: CategoryEntity[] = await this._categoriesRepository.find()
    
    return categoriesData
  }

  async findByName(name: string): Promise<CategoryEntity> {
    const categoryData: CategoryEntity = await this._categoriesRepository.findOne({ name })

    return categoryData
  }
}

export { CategoriesRepository }