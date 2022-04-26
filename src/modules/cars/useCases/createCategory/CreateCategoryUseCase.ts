import { inject, injectable } from 'tsyringe';

import { CategoryEntity } from '@modules/cars/infra/typeorm/entities/CategoryEntity';
import { ICategoriesRepository } from '@modules/cars/domain/repositories/CategoriesInterface';

import { AppError } from '@shared/errors';

interface ICreateCategoryRequest {
  name: string;
  description: string;
}

@injectable()
class CreateCategoryUseCase {
  constructor(
    @inject('CategoriesRepository')
    private _repository: ICategoriesRepository
  ) { }

  async perform({ name, description }: ICreateCategoryRequest): Promise<void> { 
    const categoryData: CategoryEntity = await this._repository.findByName(name)

    if (categoryData) throw new AppError('Category already exists!')
  
    await this._repository.create({ name, description })
  }
}

export { CreateCategoryUseCase }