import { Request, Response } from 'express';

import { CreateCarCategoryUseCase } from './CreateCarCategoryUseCase';

class CreateCarCategoryController {
  constructor(
    private _createCarCategoryUseCase: CreateCarCategoryUseCase
  ) { }

  async handle(request: Request, response: Response): Promise<Response> {
    const { name, description } = request.body

    await this._createCarCategoryUseCase.perform({ name, description })

    return response.status(201).send()
  }
}

export { CreateCarCategoryController }