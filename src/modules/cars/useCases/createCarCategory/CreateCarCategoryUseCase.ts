import { inject, injectable } from 'tsyringe';

import { CarCategoryEntity } from '@modules/cars/entities/CarCategoryEntity';
import { ICarCategoriesRepository } from '@modules/cars/repositories/CarCategoriesInterface';

import { AppError } from '@errors/app.error';

interface ICarCategoryRequest {
  name: string;
  description: string;
}

@injectable()
class CreateCarCategoryUseCase {
  constructor(
    @inject('CarCategoriesRepository')
    private _categoriesRepository: ICarCategoriesRepository
  ) { }

  async perform({ name, description }: ICarCategoryRequest): Promise<void> { 
    const categoryData: CarCategoryEntity = await this._categoriesRepository.findByName(name)

    if (categoryData) {
      throw new AppError(
        'Car category already exists!'
      )
    }
  
    await this._categoriesRepository.create({ name, description })
  }
}

export { CreateCarCategoryUseCase }