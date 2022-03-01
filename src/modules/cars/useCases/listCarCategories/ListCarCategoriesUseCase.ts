import { CarCategoryEntity } from '../../entities/CarCategoryEntity';

import { ICarCategoriesRepository } from '../../repositories/CarCategoriesInterface';

class ListCarCategoriesUseCase {
  constructor(
    private _carCategoryRepository: ICarCategoriesRepository
  ) { }

  async perform(): Promise<CarCategoryEntity[]> { 
    const categoriesData: CarCategoryEntity[] = await this._carCategoryRepository.list()

    return categoriesData
  }
}

export { ListCarCategoriesUseCase }