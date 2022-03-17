import { ICreateCarDto } from '@modules/cars/dtos/CreateCarDto';
import { CarEntity } from '@modules/cars/infra/typeorm/entities/CarEntity';

interface ICarsRepository {
  create(data: ICreateCarDto): Promise<CarEntity>;
  findByLicensePlate(license_plate: string): Promise<CarEntity>;
  findAvailableCars(
    name?: string,
    brand?: string,
    category_id?: string
  ): Promise<CarEntity[]>;
}

export { ICarsRepository }