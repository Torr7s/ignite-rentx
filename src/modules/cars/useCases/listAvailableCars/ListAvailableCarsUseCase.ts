import { inject, injectable } from 'tsyringe';

import { CarEntity } from '@modules/cars/infra/typeorm/entities/CarEntity';
import { ICarsRepository } from '@modules/cars/domain/repositories/CarsInterface';

interface IListAvailableCarsRequest {
  name?: string;
  brand?: string;
  category_id?: string;
}

@injectable()
class ListAvailableCarsUseCase {
  constructor(
    @inject('CarsRepository')
    private _repository: ICarsRepository
  ) { }

  async perform({ name, brand, category_id }: IListAvailableCarsRequest): Promise<CarEntity[]> { 
    const carsData: CarEntity[] = await this._repository.findAvailableCars(
      name, 
      brand, 
      category_id
    )

    return carsData
  }
}

export { IListAvailableCarsRequest, ListAvailableCarsUseCase }