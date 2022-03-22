import { container } from 'tsyringe';
import { Request, Response } from 'express';

import { CreateCarSpecificationUseCase } from './CreateCarSpecificationUseCase';

class CreateCarSpecificationController {
  async handle(request: Request, response: Response): Promise<Response> {
    const createCarSpecificationUseCase = container.resolve(CreateCarSpecificationUseCase)

    const { id: car_id } = request.params
    const { specifications_id } = request.body

    const cars = await createCarSpecificationUseCase.perform({
      car_id,
      specifications_id
    })

    return response.json(cars)
  }
}

export { CreateCarSpecificationController }