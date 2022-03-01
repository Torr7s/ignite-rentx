import { Request, Response } from 'express';

import { CreateCarSpecificationUseCase } from './CreateCarSpecificationUseCase';

class CreateCarSpecificationController {
  constructor(
    private _createCarSpecificationUseCase: CreateCarSpecificationUseCase
  ) { }

  async handle(request: Request, response: Response): Promise<Response> {
    const { name, description } = request.body

    await this._createCarSpecificationUseCase.perform({ name, description })

    return response.sendStatus(201)
  }
}

export { CreateCarSpecificationController }