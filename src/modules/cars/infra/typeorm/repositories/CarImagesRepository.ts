import { getRepository, Repository } from 'typeorm';

import { CarImagesEntity } from '../entities/CarImagesEntity';
import { ICarImagesRepository } from '@modules/cars/domain/repositories/CarImagesInterface';

class CarImagesRepository implements ICarImagesRepository {
  private _carImagesRepository: Repository<CarImagesEntity>

  constructor() {
    this._carImagesRepository = getRepository(CarImagesEntity)
  }
  
  async create(car_id: string, image_name: string): Promise<CarImagesEntity> {
    const carImageData: CarImagesEntity = this._carImagesRepository.create({
      car_id,
      image_name
    })

    await this._carImagesRepository.save(carImageData)

    return carImageData
  }
}

export { CarImagesRepository }