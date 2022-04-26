import { inject, injectable } from 'tsyringe';

import { CategoryEntity } from '@modules/cars/infra/typeorm/entities/CategoryEntity';
import { ICategoriesRepository } from '@modules/cars/domain/repositories/CategoriesInterface';

@injectable()
class ListCategoriesUseCase {
  constructor(
    @inject('CategoriesRepository')
    private _repository: ICategoriesRepository
  ) { }

  async perform(): Promise<CategoryEntity[]> { 
    const categoriesData: CategoryEntity[] = await this._repository.list()

    return categoriesData
  }
}

export { ListCategoriesUseCase }