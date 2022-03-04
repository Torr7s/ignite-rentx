import { container } from 'tsyringe';
import { Request, Response } from 'express';

import { ImportCarCategoriesUseCase } from './ImportCarCategoriesUseCase';

class ImportCarCategoriesController {
  async handle(request: Request, response: Response): Promise<Response> {
    const importCarCategoriesUseCase = container.resolve(ImportCarCategoriesUseCase)

    const { file } = request

    await importCarCategoriesUseCase.perform(file)

    return response.status(201).send()
  }
}

export { ImportCarCategoriesController }