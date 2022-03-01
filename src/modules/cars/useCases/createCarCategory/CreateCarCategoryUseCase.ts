import { CarCategoryEntity } from '../../entities/CarCategoryEntity';

import { ICarCategoriesRepository } from '../../repositories/CarCategoriesInterface';

interface ICarCategoryRequest {
  name: string;
  description: string;
}

class CreateCarCategoryUseCase {
  constructor(
    private _categoriesRepository: ICarCategoriesRepository
  ) { }

  async perform({ name, description }: ICarCategoryRequest): Promise<void> { 
    const categoryData: CarCategoryEntity = await this._categoriesRepository.findByName(name)

    if (categoryData) {
      throw new Error(
        'Car category already exists!'
      )
    }
  
    this._categoriesRepository.create({ name, description })
  }
}

export { CreateCarCategoryUseCase }