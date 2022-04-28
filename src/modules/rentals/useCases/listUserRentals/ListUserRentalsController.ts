import { container } from 'tsyringe';
import { Request, Response } from 'express';

import { ListUserRentalsUseCase } from './ListUserRentalsUseCase';

class ListUserRentalsController {
  async handle(request: Request, response: Response): Promise<Response> {
    const listUserRentalsUseCase = container.resolve(ListUserRentalsUseCase)

    const { user_id } = request

    const rentals = await listUserRentalsUseCase.perform (user_id)

    return response.json(rentals)
  }
}

export { ListUserRentalsController }