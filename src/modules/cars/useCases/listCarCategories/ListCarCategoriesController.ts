import { Request, Response } from 'express';

import { CarCategoryEntity } from '../../entities/CarCategoryEntity';

import { ListCarCategoriesUseCase } from './ListCarCategoriesUseCase';

class ListCarCategoriesController {
  constructor(
    private _listCarCategoriesUseCase: ListCarCategoriesUseCase
  ) { }

  async handle(request: Request, response: Response): Promise<Response> {
    const categories: CarCategoryEntity[] = await this._listCarCategoriesUseCase.perform()

    return response.json(categories)
  }
}

export { ListCarCategoriesController }