import { Request, Response } from 'express';

import { CreateCarSpecificationUseCase } from './CreateCarSpecificationUseCase';

class CreateCarSpecificationController {
  constructor(
    private _createCarSpecificationUseCase: CreateCarSpecificationUseCase
  ) { }

  handle(request: Request, response: Response): Response {
    const { name, description } = request.body

    this._createCarSpecificationUseCase.perform({ name, description })

    return response.sendStatus(201)
  }
}

export { CreateCarSpecificationController }