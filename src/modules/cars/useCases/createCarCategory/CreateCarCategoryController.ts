import { Request, Response } from 'express';

import { CreateCarCategoryUseCase } from './CreateCarCategoryUseCase';

class CreateCarCategoryController {
  constructor(
    private _createCarCategoryUseCase: CreateCarCategoryUseCase
  ) { }

  handle(request: Request, response: Response): Response {
    const { name, description } = request.body

    this._createCarCategoryUseCase.perform({ name, description })

    return response.sendStatus(201)
  }
}

export { CreateCarCategoryController }