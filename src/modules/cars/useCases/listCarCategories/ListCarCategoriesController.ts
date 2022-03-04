import { container } from 'tsyringe';
import { Request, Response } from 'express';

import { CarCategoryEntity } from '../../entities/CarCategoryEntity';

import { ListCarCategoriesUseCase } from './ListCarCategoriesUseCase';

class ListCarCategoriesController {
  async handle(request: Request, response: Response): Promise<Response> {
    const listCarCategoriesUseCase = container.resolve(ListCarCategoriesUseCase)

    const categories: CarCategoryEntity[] = await listCarCategoriesUseCase.perform()

    return response.json(categories)
  }
}

export { ListCarCategoriesController }