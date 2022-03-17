import { container } from 'tsyringe';
import { Request, Response } from 'express';

import { CategoryEntity } from '@modules/cars/infra/typeorm/entities/CategoryEntity';

import { ListCategoriesUseCase } from './ListCategoriesUseCase';

class ListCategoriesController {
  async handle(request: Request, response: Response): Promise<Response> {
    const listCategoriesUseCase = container.resolve(ListCategoriesUseCase)

    const categories: CategoryEntity[] = await listCategoriesUseCase.perform()

    return response.json(categories)
  }
}

export { ListCategoriesController }