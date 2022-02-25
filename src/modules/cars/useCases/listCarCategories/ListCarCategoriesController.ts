import { Request, Response } from 'express';

import { CarCategoryModel } from '../../models/CarCategoryModel';

import { ListCarCategoriesUseCase } from './ListCarCategoriesUseCase';

class ListCarCategoriesController {
  constructor(
    private _listCarCategoriesUseCase: ListCarCategoriesUseCase
  ) { }

  handle(request: Request, response: Response): Response {
    const categories: CarCategoryModel[] = this._listCarCategoriesUseCase.perform()

    return response.json(categories)
  }
}

export { ListCarCategoriesController }