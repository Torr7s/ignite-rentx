import { CarCategoryEntity } from '@modules/cars/entities/CarCategoryEntity';
import { ICarCategoriesRepository, ICreateCarCategoryDto } from '@modules/cars/repositories/CarCategoriesInterface';

class CarCategoriesRepositoryInMemory implements ICarCategoriesRepository {
  private categories: CarCategoryEntity[] = []
  
  async create({ name, description }: ICreateCarCategoryDto): Promise<void> {
    const newCategoryData: CarCategoryEntity = new CarCategoryEntity()
    
    Object.assign(newCategoryData, {
      name,
      description
    })

    this.categories.push(newCategoryData)
  }

  async list(): Promise<CarCategoryEntity[]> {
    const categoriesData: CarCategoryEntity[] = this.categories

    return categoriesData
  }

  async findByName(name: string): Promise<CarCategoryEntity> {
    const categoryData: CarCategoryEntity = this.categories.find((category) => category.name === name)

    return categoryData
  }
}

export { CarCategoriesRepositoryInMemory }