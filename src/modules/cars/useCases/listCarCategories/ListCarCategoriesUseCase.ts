import { inject, injectable } from 'tsyringe';

import { CarCategoryEntity } from '@modules/cars/infra/typeorm/entities/CarCategoryEntity';
import { ICarCategoriesRepository } from '@modules/cars/repositories/CarCategoriesInterface';

@injectable()
class ListCarCategoriesUseCase {
  constructor(
    @inject('CarCategoriesRepository')
    private _categoriesRepository: ICarCategoriesRepository
  ) { }

  async perform(): Promise<CarCategoryEntity[]> { 
    const categoriesData: CarCategoryEntity[] = await this._categoriesRepository.list()

    return categoriesData
  }
}

export { ListCarCategoriesUseCase }