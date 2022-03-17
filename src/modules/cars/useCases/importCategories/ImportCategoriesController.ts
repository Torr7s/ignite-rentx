import { container } from 'tsyringe';
import { Request, Response } from 'express';

import { ImportCategoriesUseCase } from './ImportCategoriesUseCase';

class ImportCategoriesController {
  async handle(request: Request, response: Response): Promise<Response> {
    const importCategoriesUseCase = container.resolve(ImportCategoriesUseCase)

    const { file } = request

    await importCategoriesUseCase.perform(file)

    return response.status(201).send()
  }
}

export { ImportCategoriesController }