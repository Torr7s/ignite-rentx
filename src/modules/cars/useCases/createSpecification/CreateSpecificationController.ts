import { container } from 'tsyringe';
import { Request, Response } from 'express';

import { CreateSpecificationUseCase } from './CreateSpecificationUseCase';

class CreateSpecificationController {
  async handle(request: Request, response: Response): Promise<Response> {
    const createSpecificationUseCase = container.resolve(CreateSpecificationUseCase)

    const { name, description } = request.body
    
    await createSpecificationUseCase.perform({ name, description })
    
    return response.sendStatus(201)
  }
}

export { CreateSpecificationController }