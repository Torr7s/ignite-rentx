import { CarCategoryModel } from '../../models/CarCategoryModel';

import { ICarCategoriesRepository } from '../../repositories/CarCategoriesInterface';

interface ICarCategoryRequest {
  name: string;
  description: string;
}

class CreateCarCategoryUseCase {
  constructor(
    private _carCategoriesRepository: ICarCategoriesRepository
  ) { }

  perform({ name, description }: ICarCategoryRequest): void { 
    const carCategory: CarCategoryModel = this._carCategoriesRepository.findByName(name)

    if (carCategory) {
      throw new Error(
        'Car category already exists!'
      )
    }
  
    this._carCategoriesRepository.create({ name, description })
  }
}

export { CreateCarCategoryUseCase }