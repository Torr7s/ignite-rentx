import { CategoryEntity } from '@modules/cars/infra/typeorm/entities/CategoryEntity';
import { ICategoriesRepository, ICreateCategoryDto } from '@modules/cars/domain/repositories/CategoriesInterface';

class CategoriesRepositoryInMemory implements ICategoriesRepository {
  private _categories: CategoryEntity[] = []
  
  async create({ name, description }: ICreateCategoryDto): Promise<void> {
    const newCategoryData: CategoryEntity = new CategoryEntity()
    
    Object.assign(newCategoryData, {
      name,
      description
    })

    this._categories.push(newCategoryData)
  }

  async list(): Promise<CategoryEntity[]> {
    const categoriesData: CategoryEntity[] = this._categories

    return categoriesData
  }

  async findByName(name: string): Promise<CategoryEntity> {
    const categoryData: CategoryEntity = this._categories
      .find((category) => category.name === name)

    return categoryData
  }
}

export { CategoriesRepositoryInMemory }