import { CarImagesEntity } from '../infra/typeorm/entities/CarImagesEntity';

interface ICarImagesRepository {
  create(car_id: string, image_name: string): Promise<CarImagesEntity>;
}

export { ICarImagesRepository }