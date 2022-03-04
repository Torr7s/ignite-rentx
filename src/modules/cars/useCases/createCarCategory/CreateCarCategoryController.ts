import { container } from 'tsyringe';
import { Request, Response } from 'express';

import { CreateCarCategoryUseCase } from './CreateCarCategoryUseCase';

class CreateCarCategoryController {
  async handle(request: Request, response: Response): Promise<Response> {
    const createCarCategoryUseCase = container.resolve(CreateCarCategoryUseCase)

    const { name, description } = request.body

    await createCarCategoryUseCase.perform({ name, description })

    return response.status(201).send()
  }
}

export { CreateCarCategoryController }