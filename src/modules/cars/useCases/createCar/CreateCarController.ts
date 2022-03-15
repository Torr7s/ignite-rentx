import { container } from 'tsyringe';
import { Request, Response } from 'express';

import { CreateCarUseCase, ICreateCarRequest } from './CreateCarUseCase';
import { CarEntity } from '@modules/cars/infra/typeorm/entities/CarEntity';

class CreateCarController {
  async handle(request: Request, response: Response): Promise<Response> {
    const createCarUseCase = container.resolve(CreateCarUseCase)

    const data: ICreateCarRequest = request.body

    const car: CarEntity = await createCarUseCase.perform(data)

    return response.status(201).json(car)
  }
}

export { CreateCarController }