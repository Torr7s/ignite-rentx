import { CarCategoryModel } from '../../models/CarCategoryModel';

import { ICarCategoriesRepository } from '../../repositories/CarCategoriesInterface';

class ListCarCategoriesUseCase {
  constructor(
    private _carCategoryRepository: ICarCategoriesRepository
  ) { }

  perform(): CarCategoryModel[] { 
    const categories: CarCategoryModel[] = this._carCategoryRepository.list()

    return categories
  }
}

export { ListCarCategoriesUseCase }