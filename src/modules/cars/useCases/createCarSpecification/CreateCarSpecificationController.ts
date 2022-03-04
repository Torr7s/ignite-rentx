import { container } from 'tsyringe';
import { Request, Response } from 'express';

import { CreateCarSpecificationUseCase } from './CreateCarSpecificationUseCase';

class CreateCarSpecificationController {
  async handle(request: Request, response: Response): Promise<Response> {
    const createCarSpecificationUseCase = container.resolve(CreateCarSpecificationUseCase)

    const { name, description } = request.body
    
    await createCarSpecificationUseCase.perform({ name, description })
    
    return response.sendStatus(201)
  }
}

export { CreateCarSpecificationController }