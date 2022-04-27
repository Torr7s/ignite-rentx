import { container } from 'tsyringe';
import { Request, Response } from 'express';

import { DevolutionRentalUseCase } from './DevolutionRentalUseCase';

class DevolutionRentalController {
  async handle(request: Request, response: Response): Promise<Response> {
    const devolutionRentalUseCase = container.resolve(DevolutionRentalUseCase)

    const { id } = request.params
    const { user_id } = request

    const rental = await devolutionRentalUseCase.perform({ id, user_id })

    return response.json(rental)
  }
}

export { DevolutionRentalController }