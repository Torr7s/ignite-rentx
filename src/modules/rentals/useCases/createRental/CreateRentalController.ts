import { container } from 'tsyringe';
import { Request, Response } from 'express';

import { CreateRentalUseCase } from './CreateRentalUseCase';
import { RentalEntity } from '@modules/rentals/infra/typeorm/entities/RentalEntity';

class CreateRentalController {
  async handle(request: Request, response: Response): Promise<Response> {
    const createRentalUseCase = container.resolve(CreateRentalUseCase)

    const { user_id } = request
    const { car_id, expected_return_date } = request.body

    const rental: RentalEntity = await createRentalUseCase.perform({
      car_id,
      expected_return_date,
      user_id
    })

    return response.status(201).json(rental)
  }
}

export { CreateRentalController }