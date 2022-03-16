import { container } from 'tsyringe';
import { Request, Response } from 'express';

import { IListAvailableCarsRequest, ListAvailableCarsUseCase } from './listAvailableCarsUseCase';
import { CarEntity } from '@modules/cars/infra/typeorm/entities/CarEntity';

class ListAvailableCarsController {
  async handle(request: Request, response: Response): Promise<Response> { 
    const listAvailableCarsUseCase = container.resolve(ListAvailableCarsUseCase)

    const { name, brand, category_id }: IListAvailableCarsRequest = request.query

    const availableCars: CarEntity[] = await listAvailableCarsUseCase.perform({
      name,
      brand,
      category_id
    })

    return response.json(availableCars)
  }
}

export { ListAvailableCarsController }